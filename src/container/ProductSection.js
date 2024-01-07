import React, { useEffect, useState } from 'react';
import './productSection.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import HiddenVariant from './HiddenVariant';
import { selectVisibility, toggleVisibity } from '../features/productDetailSlice';
import SmallScreenHiddenVariant from './SmallScreenHiddenVariant';
import Pagination from 'react-js-pagination';
import Footer from '../components/Footer';

function ProductSection() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const visibity = useSelector(selectVisibility);
    const { name } = useParams();
    const [loading, setLoading] = useState(true);
    const [PRODUCT, SETPRODUCT] = useState([])
    const [Variant, setVariants] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 10; // Number of items to display per page
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const snapshotId = "QiyfnD3IGQUZG9DBX6j8"
            try {
                const docRef = await db.collection('Products').doc(snapshotId).get();
                const productData = docRef.data()
                const filteredProduct = [];
                if (productData && Array.isArray(productData.data)) {
                    productData.data.forEach(products => {
                        if (products.product_type === `${name}`) {
                            filteredProduct.push(products);
                        }
                    })
                    console.log(filteredProduct);
                    SETPRODUCT(filteredProduct);
                    setLoading(false);
                }

            } catch (error) {
                console.error(error);
            }
        }
        fetchProduct()
    }, [])

    const Loading = () => {
        return (
            <>
                <tr>
                    <td colspan='5' className='my-3'>
                        <Skeleton height="120px" width='100%' />
                    </td>

                </tr>
                <tr>
                    <td colspan='5' className='my-3'>
                        <Skeleton height="120px" width='100%' />
                    </td>

                </tr>
                <tr>
                    <td colspan='5' className='my-3'>
                        <Skeleton height="120px" width='100%' />
                    </td>

                </tr>
            </>

        )
    }

    const SmallScreenLoading = () => {
        return (
            <>
                <div>
                    <Skeleton height="90px" width='100%' />
                </div>
                <div>
                    <Skeleton height="90px" width='100%' />
                </div>
                <div>
                    <Skeleton height="90px" width='100%' />
                </div>
            </>
        )
    }
    const Hiddenvariant = (itemId) => {
        dispatch(toggleVisibity({ itemId }));
        const filteredVariants = PRODUCT.filter((item) => item.id === itemId).map((item) => item.variants);
        setVariants(filteredVariants);



    }
    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProduct = PRODUCT.slice(indexOfFirstItem, indexOfLastItem);
    return (
        <div className='productSection'>
            <div className='top__image py-4'>
                <p className='top__subheader'>
                    <nav aria-label="breadcrumb" className='d-flex justify-content-center align-items-center'>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a onClick={() => navigate('/')}>Home</a></li>
                            <li class="breadcrumb-item active" aria-current="page">{name}</li>
                        </ol>
                    </nav>

                </p>
                <p className='top__header text-center py-2'>
                    Collection Home - {name}
                </p>
            </div>
            <div className='productSection__content d-flex-md mx-md-5 mx-2'>
                <div className='col-lg-3 '>
                    <div className='d-none d-sm-block'>
                        <h2>category</h2>
                    </div>
                </div>
                <div className='col-lg-9 col-12'>
                    {/* Display table for large screen  */}
                    <div className='mt-5 d-none d-sm-block' >
                        <table className="table table-bordered">
                            <thead >
                                <tr className='text-center'>
                                    <th scope="col">IMAGES</th>
                                    <th scope="col">PRODUCT</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">QTY</th>
                                    <th scope="col">OPTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? <Loading /> : currentProduct.map((items, index) => {
                                        return (
                                            <>
                                                <tr key={items.id} >
                                                    <th scope="row">
                                                        <div className='my-1 d-flex justify-content-center'>
                                                            <img src={items.image.src} height='120px' width='100px' />
                                                        </div>

                                                    </th>
                                                    <td>
                                                        <div className='d-flex justify-content-center align-items-center' style={{ height: "120px" }}>
                                                            <p style={{ width: "200px" }} className='table__title'>{items.title}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className='product__price d-flex justify-content-center align-items-center' style={{ height: "120px" }}>${items.variants[0].price}</p>
                                                    </td>
                                                    <td>
                                                        <p className='d-flex justify-content-center align-items-center' style={{ height: "120px" }}>Quantity</p>
                                                    </td>
                                                    <td>
                                                        <div className='Variant_button d-flex justify-content-center align-items-center' style={{ height: "120px" }} >

                                                            <button className='btn btn-dark' onClick={() => Hiddenvariant(items.id)}>
                                                                {
                                                                    visibity[items.id] ? 'HIDE VARIANTS' : 'SHOW VARIANTS'
                                                                }
                                                            </button>


                                                        </div>

                                                    </td>

                                                </tr>


                                                {visibity[items.id] && (
                                                    <tr>
                                                        <th scope='row'></th>
                                                        <td colSpan='4'>
                                                            {
                                                                Variant.map((VariantGroup, index) => (

                                                                    <div key={index}>
                                                                        {
                                                                            VariantGroup.map((variantItem) => (
                                                                                <div key={variantItem.id}>
                                                                                    <HiddenVariant
                                                                                        id={variantItem.id}
                                                                                        itemTitle={items.title}
                                                                                        variantTitle={variantItem.title}
                                                                                        VariantPrice={variantItem.price}
                                                                                        variantImage={items.image.src}
                                                                                    />
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                ))
                                                            }
                                                        </td>
                                                    </tr>
                                                )

                                                }


                                            </>
                                        )
                                    })


                                }

                            </tbody>
                        </table>
                    </div>

                    {/* Display table for small screen*/}
                    <div className='mt-5 d-block d-sm-none container-fluid' style={{ border: "1px solid #f0f1f7 " }}>
                        {
                            loading ? <SmallScreenLoading /> : currentProduct.map((items) => {
                                return (
                                    <>
                                        <div className='row my-3 py-3' style={{ borderBottom: "1px solid #f0f1f7" }}>
                                            <div className='col-3'>
                                                <img src={items.image.src} width='100px' height='120px' style={{ objectFit: "cover" }} />
                                            </div>
                                            <div className='col-9'>
                                                <div className='d-flex justify-content-center'>
                                                    <p style={{ width: "200px" }} className='table__title'>{items.title}</p>
                                                </div>
                                                <div className='d-flex justify-content-evenly mx-3'>
                                                    <p style={{ fontSize: "21px", fontWeight: "600" }}>${items.variants[0].price}</p>

                                                    <button className='btn btn-dark' style={{ fontSize: "12px", borderRadius: "0", height: "30px" }} onClick={() => Hiddenvariant(items.id)}>

                                                        {visibity[items.id] ? ' HIDDEN VARIANTS' : 'SHOW VARIANTS'}
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                        {visibity[items.id] && (
                                            <div>

                                                <div className='mt-0 mx-0'>
                                                    {
                                                        Variant.map((VariantGroup, index) => (

                                                            <div key={index} style={{ backgroundColor: "#f0f1f7" }}>
                                                                {
                                                                    VariantGroup.map((variantItem) => (
                                                                        <div key={variantItem.id} style={{ borderBottom: "1px solid #dddee1" }}>
                                                                            <SmallScreenHiddenVariant
                                                                                itemTitle={items.title}
                                                                                variantImage={items.image.src}
                                                                                variantTitle={variantItem.title}
                                                                                variantPrice={variantItem.price}
                                                                            />
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        )

                                        }
                                    </>
                                )


                            })
                        }
                    </div>

                    <div className="d-flex justify-content-center mt-4">
                        <Pagination
                            itemClass="page-item"
                            linkClass="page-link"
                            activePage={activePage}
                            itemsCountPerPage={itemsPerPage}
                            totalItemsCount={PRODUCT.length}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ProductSection;