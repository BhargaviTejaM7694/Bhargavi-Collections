"use client";

import { useState, useEffect, useRef } from "react";
import AdminGuard from "@/components/AdminGuard";
import AdminSidebar, { AdminMobileNav } from "@/components/AdminSidebar";
import {
  getAdminProducts, addProduct, updateProduct, deleteProduct,
  getAdminCategories, addCategory, deleteCategory, fileToDataUrl,
} from "@/lib/storage";
import OptimizedImage from "@/components/OptimizedImage";
import type { Product, Category, ProductVariant } from "@/types";

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

interface ProductFormData {
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  quantity: number;
}

const emptyProduct: ProductFormData = {
  name: "",
  price: 0,
  category: "",
  image: "",
  description: "",
  quantity: 0,
};

function ProductsManagement() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(emptyProduct);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleteCatConfirm, setDeleteCatConfirm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [catName, setCatName] = useState("");
  const [catDescription, setCatDescription] = useState("");
  const [catImageFile, setCatImageFile] = useState<File | null>(null);
  const [catImagePreview, setCatImagePreview] = useState("");
  const [variants, setVariants] = useState<{ color: string; colorCode: string; image: string; preview: string; quantity: number }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const catFileInputRef = useRef<HTMLInputElement>(null);
  const variantFileRefs = useRef<Map<number, HTMLInputElement>>(new Map());

  useEffect(() => {
    async function load() {
      const [products, categories] = await Promise.all([
        getAdminProducts(),
        getAdminCategories(),
      ]);

      const hasBase64 = products.some(p => p.image?.startsWith("data:")) ||
                        categories.some(c => c.image?.startsWith("data:"));

      if (hasBase64) {
        try {
          await fetch("/api/admin/migrate-images", { method: "POST" });
          const [freshProducts, freshCategories] = await Promise.all([
            getAdminProducts(),
            getAdminCategories(),
          ]);
          setProductsList(freshProducts);
          setCategoriesList(freshCategories);
          return;
        } catch {
          // fall through to show what we have
        }
      }

      setProductsList(products);
      setCategoriesList(categories);
    }
    load();
  }, []);

  const filtered = productsList.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = !filterCategory || p.category === filterCategory;
    return matchSearch && matchCategory;
  });

  const openAdd = () => {
    setEditingProduct(null);
    setFormData(emptyProduct);
    setImageFile(null);
    setImagePreview("");
    setVariants([]);
    setShowModal(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name, price: product.price, category: product.category,
      image: product.image, description: product.description,
      quantity: product.quantity ?? 0,
    });
    setImageFile(null);
    setImagePreview(product.image);
    setVariants(product.variants?.map(v => ({ ...v, preview: v.image, quantity: v.quantity ?? 0 })) || []);
    setShowModal(true);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url;
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const dataUrl = await fileToDataUrl(file);
    setImagePreview(dataUrl);
  };

  const handleCatImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCatImageFile(file);
    const dataUrl = await fileToDataUrl(file);
    setCatImagePreview(dataUrl);
  };

  const [saving, setSaving] = useState(false);
  const [variantUploading, setVariantUploading] = useState(0);

  const handleSave = async () => {
    if (!formData.name || !formData.category || formData.price <= 0) return;
    if (!imageFile && !formData.image && !editingProduct?.image) return;

    setSaving(true);
    try {
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      } else if (editingProduct) {
        imageUrl = editingProduct.image;
      }

      const inStock = formData.quantity > 0;

      const finalVariants: ProductVariant[] = variants
        .filter(v => v.color && v.image)
        .map(v => ({ color: v.color, colorCode: v.colorCode, image: v.image, quantity: v.quantity ?? 0 }));

      if (editingProduct) {
        const updated: Product = { ...editingProduct, ...formData, image: imageUrl, inStock, variants: finalVariants.length > 0 ? finalVariants : undefined };
        await updateProduct(updated);
      } else {
        const newProduct: Product = { id: generateSlug(formData.name) + "-" + Date.now(), ...formData, image: imageUrl, inStock, variants: finalVariants.length > 0 ? finalVariants : undefined };
        await addProduct(newProduct);
      }
      setProductsList(await getAdminProducts());
      setShowModal(false);
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setProductsList(await getAdminProducts());
    setDeleteConfirm(null);
  };

  const handleAddCategory = async () => {
    if (!catName.trim()) return;
    setSaving(true);
    try {
      let image = "";
      if (catImageFile) {
        image = await uploadImage(catImageFile);
      }
      const newCat: Category = {
        id: generateSlug(catName),
        name: catName.trim(),
        image,
        description: catDescription.trim(),
      };
      await addCategory(newCat);
      setCategoriesList(await getAdminCategories());
      setCatName("");
      setCatDescription("");
      setCatImageFile(null);
      setCatImagePreview("");
      setShowCategoryModal(false);
    } catch (err) {
      console.error("Category save error:", err);
      alert("Failed to add category. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (catId: string) => {
    await deleteCategory(catId);
    setCategoriesList(await getAdminCategories());
    setDeleteCatConfirm(null);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminMobileNav />
        <div className="p-4 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-heading text-3xl text-burgundy font-bold">Products</h1>
              <p className="text-gray-500 text-sm mt-1">{productsList.length} total products</p>
            </div>
            <div className="flex items-center gap-3 self-start">
              <button onClick={() => setShowCategoryModal(true)} className="bg-burgundy/80 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-burgundy transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Category
              </button>
              <button onClick={openAdd} className="bg-burgundy text-white px-5 py-2.5 rounded-lg font-medium hover:bg-burgundy-dark transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Product
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy" />
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy bg-white">
              <option value="">All Categories</option>
              {categoriesList.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
            </select>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Image</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Name</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Category</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Price</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Pieces</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Status</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 relative">
                          <OptimizedImage src={product.image} alt={product.name} fill className="object-cover" sizes="48px" />
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span className="font-medium text-gray-800 block max-w-[200px] truncate">{product.name}</span>
                        {product.variants && product.variants.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            <span className="w-3.5 h-3.5 rounded-full border border-gray-300 inline-block" style={{ backgroundColor: "#000000" }} title="Default" />
                            {product.variants.map((v, vi) => (
                              <span key={vi} className="w-3.5 h-3.5 rounded-full border border-gray-300 inline-block" style={{ backgroundColor: v.colorCode }} title={v.color} />
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-3 text-gray-600 capitalize">{product.category}</td>
                      <td className="px-6 py-3 text-gold font-semibold">₹{product.price.toLocaleString("en-IN")}</td>
                      <td className="px-6 py-3 text-gray-700 font-medium">{product.quantity ?? 0}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEdit(product)} className="text-blue-600 hover:text-blue-800 p-1" title="Edit">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          {deleteConfirm === product.id ? (
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800 text-xs font-medium px-2 py-1 bg-red-50 rounded">Yes</button>
                              <button onClick={() => setDeleteConfirm(null)} className="text-gray-500 hover:text-gray-700 text-xs font-medium px-2 py-1 bg-gray-50 rounded">No</button>
                            </div>
                          ) : (
                            <button onClick={() => setDeleteConfirm(product.id)} className="text-red-500 hover:text-red-700 p-1" title="Delete">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400">No products found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-gray-900">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
              <button onClick={() => { if (variants.length > 0 && !confirm("You have unsaved variant changes. Close without saving?")) return; setShowModal(false); }} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy" placeholder="e.g. Traditional Gold Necklace" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                  <input type="number" value={formData.price || ""} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy" placeholder="599" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy bg-white">
                    <option value="">Select category</option>
                    {categoriesList.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. of Pieces Available *</label>
                <input type="number" min={0} value={formData.quantity || ""} onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy" placeholder="10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image *</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-burgundy/50 transition-colors"
                >
                  {imagePreview ? (
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-sm text-gray-700 font-medium truncate">{imageFile?.name || "Current image"}</p>
                        <p className="text-xs text-gray-500">Click to change</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <p className="text-sm text-gray-500">Click to upload image</p>
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP</p>
                    </div>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </div>
              {/* Color Variants */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Color Variants</label>
                  <button
                    type="button"
                    onClick={() => setVariants([...variants, { color: "", colorCode: "#000000", image: "", preview: "", quantity: 0 }])}
                    className="text-xs text-burgundy hover:text-burgundy-dark font-medium flex items-center gap-1"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Add Variant
                  </button>
                </div>
                {variants.length === 0 && (
                  <p className="text-xs text-gray-400">No variants — product has a single style. Add variants for different bead colors, finishes, etc.</p>
                )}
                <div className="space-y-3">
                  {variants.map((v, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1 space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={v.color}
                            onChange={(e) => { const u = [...variants]; u[i] = { ...u[i], color: e.target.value }; setVariants(u); }}
                            className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-burgundy/30"
                            placeholder="Color name (e.g. Black, Green)"
                          />
                          <input
                            type="color"
                            value={v.colorCode}
                            onChange={(e) => { const u = [...variants]; u[i] = { ...u[i], colorCode: e.target.value }; setVariants(u); }}
                            className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
                            title="Pick color"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            min={0}
                            value={v.quantity ?? ""}
                            onChange={(e) => { const u = [...variants]; u[i] = { ...u[i], quantity: Number(e.target.value) }; setVariants(u); }}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-burgundy/30"
                            placeholder="No. of pieces available"
                          />
                        </div>
                        <div
                          onClick={() => variantFileRefs.current.get(i)?.click()}
                          className="border border-dashed border-gray-300 rounded p-2 text-center cursor-pointer hover:border-burgundy/50 transition-colors"
                        >
                          {(v.preview || v.image) ? (
                            <div className="flex items-center gap-2">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={v.preview || v.image} alt="Variant" className="w-10 h-10 rounded object-cover" />
                              <span className="text-xs text-gray-500">{v.preview && !v.image ? "Uploading..." : "Click to change"}</span>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">Click to upload variant image</span>
                          )}
                        </div>
                        <input
                          ref={(el) => { if (el) variantFileRefs.current.set(i, el); }}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const dataUrl = await fileToDataUrl(file);
                            const u = [...variants];
                            u[i] = { ...u[i], preview: dataUrl, image: "" };
                            setVariants(u);
                            setVariantUploading(c => c + 1);
                            try {
                              const url = await uploadImage(file);
                              setVariants(prev => {
                                const updated = [...prev];
                                if (updated[i]) updated[i] = { ...updated[i], image: url };
                                return updated;
                              });
                            } catch {
                              alert("Failed to upload variant image. Please try again.");
                            } finally {
                              setVariantUploading(c => c - 1);
                            }
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setVariants(variants.filter((_, j) => j !== i))}
                        className="text-red-400 hover:text-red-600 p-1 mt-1"
                        title="Remove variant"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy resize-none" placeholder="Product description..." />
              </div>
              <p className="text-xs text-gray-500">Stock status is set automatically — products with 0 pieces are marked &ldquo;Out of Stock&rdquo;.</p>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button onClick={() => { if (variants.length > 0 && !confirm("You have unsaved variant changes. Close without saving?")) return; setShowModal(false); }} className="px-5 py-2.5 text-gray-600 hover:text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving || variantUploading > 0} className={`px-5 py-2.5 font-medium rounded-lg transition-colors ${saving || variantUploading > 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-burgundy text-white hover:bg-burgundy-dark"}`}>
                {variantUploading > 0 ? "Uploading images..." : saving ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-gray-900">Add New Category</h2>
              <button onClick={() => setShowCategoryModal(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
                <input type="text" value={catName} onChange={(e) => setCatName(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy" placeholder="e.g. Anklets" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input type="text" value={catDescription} onChange={(e) => setCatDescription(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy" placeholder="Short description..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
                <div
                  onClick={() => catFileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-burgundy/50 transition-colors"
                >
                  {catImagePreview ? (
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={catImagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-sm text-gray-500">Click to change</p>
                    </div>
                  ) : (
                    <div>
                      <svg className="w-8 h-8 text-gray-400 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <p className="text-xs text-gray-400">Click to upload</p>
                    </div>
                  )}
                </div>
                <input ref={catFileInputRef} type="file" accept="image/*" onChange={handleCatImageChange} className="hidden" />
              </div>

              {/* Existing Categories */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Existing Categories ({categoriesList.length})</p>
                <div className="flex flex-wrap gap-2">
                  {categoriesList.map((c) => (
                    <div key={c.id} className="inline-flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1.5 text-sm">
                      <span className="text-gray-700">{c.name}</span>
                      {deleteCatConfirm === c.id ? (
                        <div className="flex items-center gap-1 ml-1">
                          <button onClick={() => handleDeleteCategory(c.id)} className="text-red-600 text-xs font-bold">✓</button>
                          <button onClick={() => setDeleteCatConfirm(null)} className="text-gray-400 text-xs font-bold">✗</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteCatConfirm(c.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button onClick={() => setShowCategoryModal(false)} className="px-5 py-2.5 text-gray-600 hover:text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors">Close</button>
              <button onClick={handleAddCategory} disabled={!catName.trim() || saving} className={`px-5 py-2.5 font-medium rounded-lg transition-colors ${!catName.trim() || saving ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-burgundy text-white hover:bg-burgundy-dark"}`}>
                {saving ? "Saving..." : "Add Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <AdminGuard>
      <ProductsManagement />
    </AdminGuard>
  );
}
