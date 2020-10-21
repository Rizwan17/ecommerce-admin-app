import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { Container, Row, Col } from 'react-bootstrap';
import linearCategories from '../../helpers/linearCategories';
import { useSelector, useDispatch } from 'react-redux';
import { createPage } from '../../actions';

/**
* @author
* @function NewPage
**/

const NewPage = (props) => {

    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const page = useSelector(state => state.page);


    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category]);

    useEffect(() => {
        console.log(page);
        if(!page.loading){
            setCreateModal(false);
            setTitle('');
            setCategoryId('');
            setDesc('');
            setProducts([]);
            setBanners([]);
        }
    }, [page]);

    const onCategoryChange = (e) => {
        const category = categories.find(category => category.value == e.target.value);
        setCategoryId(e.target.value);
        setType(category.type);
    }

    const handleBannerImages = (e) => {
        console.log(e);
        setBanners([...banners, e.target.files[0]]);
    }

    const handleProductImages = (e) => {
        console.log(e);
        setProducts([...products, e.target.files[0]]);
    }

    const submitPageForm = (e) => {
        //e.target.preventDefault();

        if(title === ""){
            alert('Title is required');
            setCreateModal(false);
            return;
        }

        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner, index) => {
            form.append('banners', banner);
        });
        products.forEach((product, index) => {
            form.append('products', product);
        });

        dispatch(createPage(form));

        
    }

    const renderCreatePageModal = () => {
        return (
            <Modal
                show={createModal}
                modalTitle={'Create New Page'}
                handleClose={() => setCreateModal(false)}
                onSubmit={submitPageForm}
            >
                <Container>
                    <Row>
                        <Col>
                            {/* <select
                                className="form-control"
                                value={categoryId}
                                onChange={onCategoryChange}
                            >
                                <option value="">select category</option>
                                {
                                    categories.map(cat =>
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    )
                                }
                            </select> */}
                            <Input 
                                type="select"
                                value={categoryId}
                                onChange={onCategoryChange}
                                options={categories}
                                placeholder={'Select Category'}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={'Page Title'}
                                className=""
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder={'Page Desc'}
                                className=""
                            />
                        </Col>
                    </Row>

                    {
                            banners.length > 0 ? 
                            banners.map((banner, index) => 
                                <Row key={index}>
                                    <Col>{banner.name}</Col>
                                </Row>
                            ) : null
                    }
                    <Row>
                        <Col>
                            <Input
                                className="form-control" 
                                type="file" 
                                name="banners"
                                onChange={handleBannerImages}
                            />
                        </Col>
                    </Row>

                    {
                            products.length > 0 ? 
                            products.map((product, index) => 
                                <Row key={index}>
                                    <Col>{product.name}</Col>
                                </Row>
                            ) : null
                        }
                    <Row>
                        <Col>
                            <Input 
                                className="form-control"
                                type="file" 
                                name="products"
                                onChange={handleProductImages}
                            />
                        </Col>
                    </Row>

                    

                </Container>


            </Modal>
        );
    }


    return (
        <Layout sidebar>
            {
                page.loading ? 
                <p>Creating Page...please wait</p>
                :
                <>
                    {renderCreatePageModal()}
                    <button onClick={() => setCreateModal(true)}>Create Page</button>
                </>
            }
            
        </Layout>
    )

}

export default NewPage