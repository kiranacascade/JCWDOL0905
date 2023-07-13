import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { Toaster } from "react-hot-toast";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Pagination } from "semantic-ui-react";
import DeleteProductModal from "../../component/manageProduct/DeleteProductModal";
import AddProductModal from "../../component/manageProduct/AddProductModal";
import EditProductModal from "../../component/manageProduct/EditProductModal";
import Layout from "../../component/Layout";
import { useSearchParams } from "react-router-dom";

const ManageProduct = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activePage, setActivePage] = useState(searchParams.get("page") || 1);
  const [totalPage, setTotalPage] = useState(1);
  const [order, setOrder] = useState(searchParams.get("order") || "")
  const [sort, setSort] = useState(searchParams.get("sort") || 'ASC');
  const [search, setSearch] = useState("")
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [searchedProduct, setSearchedProduct] = useState(searchParams.get("name") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState({})

  useEffect(() => {
    setSearchParams({ 
      page: activePage,
      sort: sort,
      order: order,
      category: selectedCategory,
      name: searchedProduct
    });
  }, [activePage, sort, order, selectedCategory, searchedProduct]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await api.get("/category");
        setCategories(categoriesData.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCategories();
    
    async function fetchProducts() {
      try{
        const productsData = await api.get('/product', {
          params: {
            order: order,
            sort: sort,
            name: searchedProduct,
            category: selectedCategory,
            page: activePage
          }
        });
        setProducts(productsData.data.data);
        setTotalPage(Math.ceil(productsData.data.count / 8));  
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts()
  }, [activePage, sort, order, selectedCategory, searchedProduct]);

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const openDeleteModal = (productId) => {
    setSelectedProductId(productId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedProductId(null);
    setDeleteModalOpen(false);
  };

  const openEditModal = (productData) => {
    setSelectedProduct(productData);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedProduct({});
    setEditModalOpen(false);
  };

  const handleSortChange = (e) => {
    const values = JSON.parse(e.target.value);
    setSort(values.sort);
    setOrder(values.order);
    setActivePage(1);
  };
  const handleFilterCategory = (e) => {
    setSelectedCategory(e.target.value)
    setActivePage(1);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
    setActivePage(1);
    setSearchedProduct(search)
  }};
  function formatIDR(price) {
    let idr = Math.round(price).toLocaleString("id-ID");
    return `Rp ${idr}`;
  }

  return (
    <Layout>
    <div className="flex min-w-screen min-h-screen">
      <Toaster />
      <div className="flex mx-auto rounded-md w-full max-w-xl max-h-5xl px-2 bg-white md:w-full md:max-w-4xl md:px-6 lg:w-full lg:max-w-7xl lg:h-7xl lg:px-4">
        <div className="w-full lg:w-full p-4 lg:p-8 justify-start ">
          <div className="flex justify-between items-center my-3 mb-8">
            <h2>Manage Product</h2>
            <button
              className="bg-green-500 h-10 px-4 md:px-8 lg:px-8 text-white font-semibold rounded-md hover:bg-green-600 active:bg-green-700"
              onClick={openAddModal}
            >
              Add Product
            </button>
          </div>

          <div>
          <div className="flex flex-col md:flex-row lg:flex-row mb-6">
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="search" type="search"
                  placeholder="Search product name"
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown} defaultValue={searchedProduct}
                  className="w-full rounded-md border-0 pl-10 pr-40 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-md sm:leading-6"
                />
                <select className="absolute right-0 bg-gray-100 right-0 rounded-r-md border border-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 active:border-green-500 hover:border-green-500 target:border-green-500" onChange={handleFilterCategory} value={selectedCategory}>
                <option key="" value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex mt-4 md:ml-8 md:mt-0 items-center">
                <label className="block w-16 text-md font-medium leading-6 text-gray-900 mr-2 ">
                  Sort by:
                </label>
                <select
                  className="w-56 lg:w-60 rounded-md border border-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 active:border-green-500 hover:border-green-500 target:border-green-500"
                  id="filter" value={JSON.stringify({ order, sort })}
                  onChange={handleSortChange}
                >
                  <option value='{"order":"product_name","sort":"ASC"}'>Product Name A-Z</option>
                  <option value='{"order":"product_name","sort":"DESC"}'>Product Name Z-A</option>
                  <option value='{"order":"product_price","sort":"ASC"}'>Price Lowest-Highest</option>
                  <option value='{"order":"product_price","sort":"DESC"}'>Price Highest-Lowest</option>
                </select>
              </div>
            </div>
            
            
            {products.map((product) => (
              <div className="grid grid grid-cols-1 gap-y-4 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-6 lg:gap-x-4 rounded-md border border-gray-300 p-3 mb-4">
                <div className="flex w-full bg-neutral-300 shrink-0">
                  <div className="square-image-container ">
                    <img src={product.product_image} alt={product.product_image}className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    />
                  </div>
                </div>
                <div className="flex-col h-full sm:col-span-2 lg:col-span-4 mt-1">
                  <div className="flex flex-col lg:flex-row lg:justify-between">
                    <h3 className="font-bold text-gray-900 my-1 mr-4 mb-4">
                      {product.product_name}
                    </h3>
                    <div class="flex h-7 w-40 shrink-0 justify-center items-center rounded-full bg-orange-50 py-1 mb-4 text-sm font-medium text-orange-600 ring-1 ring-inset ring-red-600/10">
                      {product.Category.category_name}
                    </div>
                  </div>
                  <p className="w-full text-md text-gray-800">
                    {product.product_description}</p>

                  <div className="items-end">
                    <span className="text-lg font-bold text-green-500">
                      {formatIDR(product.product_price)}
                    </span>
                    <span className="ml-3 text-sm text-gray-400 my-1">
                      / {product.weight} gram
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex justify-between">
                    <button
                      className="m-2 p-2 border border-green-600 hover:border-green-800 text-lg font-bold text-green-600 hover:text-green-800 rounded-full"
                      onClick={() => openEditModal(product)}
                    >
                      <PencilSquareIcon
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      className="m-2 p-2 border border-red-600 text-lg font-bold text-red-600 hover:border-red-800 hover:text-red-800 rounded-full"
                      onClick={() => openDeleteModal(product.id)}
                    >
                      <TrashIcon className="block h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center items-end">
              <Pagination
                activePage={activePage}
                totalPages={totalPage}
                onPageChange={(e, pageInfo) => {
                  setActivePage(pageInfo.activePage);
                }}
              />
            </div>
        </div>
        <div></div>
      </div>
      {addModalOpen && (<AddProductModal open={addModalOpen} setOpen={setAddModalOpen} categories={categories} cancelButtonRef={null} onClose={closeAddModal} /> )}
      {deleteModalOpen && (<DeleteProductModal open={deleteModalOpen} setOpen={setDeleteModalOpen} productId={selectedProductId} cancelButtonRef={null} onClose={closeDeleteModal} /> )}
      {editModalOpen && (<EditProductModal open={editModalOpen} setOpen={setEditModalOpen} categories={categories} product={selectedProduct} cancelButtonRef={null} onClose={closeEditModal} />)}
    </div>
    </Layout>
  );
};

export default ManageProduct;