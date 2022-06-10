import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu,  Row, Col, Pagination } from "antd";
import api from "./utils/Api"

//import { postData } from "../posts";

import { BoxCard } from "./components/BoxCard/index.jsx";
import {Title} from "./components/Title/index";
import { DataUser } from "./components/DataUser";
import { CurrentUserContext } from "./context/currentUser";


const { Header, Content, Footer } = Layout;




export const App = () => {
	const [data, setData] = useState([]);
	const [rows, setRows] = useState([0, 9]);
	const [currentUser, setCurrentUser] = useState({})



	let res = [];
	data.map((elem, indx) => {
		if (indx < rows[1] && indx >= rows[0]) {
			res.push(elem);
		}
	});

	// Promise.all вернет 2 промиса, когда оба отработают.
	 useEffect(()=> {
		Promise.all([api.getCards(),api.getUser()])
		  .then(([postsData, userData])=> {
			setData(postsData);
			setCurrentUser(userData)
		  })
	 },[])

	 
	function handlePostsLIke ({_id, likes}){
		
		const isLiked = likes.some(id => id === currentUser._id)
	
		api.changeLikeStatus(_id, isLiked)
		.then((newCard)=> {
		
			const newCardsState = data.map(c => { 

			  return c._id === newCard._id ? newCard : c 
			})
			setData(newCardsState);
		 })
	 }

	 function handleDelCard(id, author) {
		 if (currentUser._id === author._id) {
			let del = confirm("Удалить ерись");
			if (del) {
			  api.delCard(id)
			  .then(() => {
				 const newData = data.filter((e) => {
					if (e._id !== id) {
					  return e;
					}
				 });
				 setData(newData);
			  });
			}
		 } else {
			 alert( "Нельзя удалить пост другого автора")
		 }
	
   }
 

	return (
		<CurrentUserContext.Provider value={currentUser} >
		<div className="container">
			<Layout style={{ width: "100%" }}>
				<Header
					className="header"
					style={{ position: "sticky", top: 0, zIndex: 1, maxWidth: 1440 }}
				>	<div className="logo"></div>
					<DataUser/>
					<Menu className="header__menu" theme="dark" mode="horizontal">
						<Menu.Item key="1">
							<a href="#">Home</a>
						</Menu.Item>
						<Menu.Item key="2">
							<a href="https://remix.run/docs/en/v1">Remix Docs</a>
						</Menu.Item>
						<Menu.Item key="3">
							<a href="https://github.com/">GitHub</a>
						</Menu.Item>
					</Menu>
				</Header>
				<Content className="site-layout" style={{ padding: "0 50px", marginTop: 15 }} >
					<Title/>
					<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }} >
						<Row gutter={[16, 24]} >
							{res.map((item) => {
					
								return (
									<Col  key={item._id} className="gutter-row card" xs={24} md={12} lg={12} xl={8}>
										<BoxCard {...item} onPostsLike={handlePostsLIke}  handleDelCard={handleDelCard}/>										
									</Col>
								);
							})}
						</Row>
						<Pagination
							defaultCurrent={1}
							onChange={function (page) {
								setRows((state) => {
									return [page * 9 - 9, page * 9];
								});
							}}
							defaultPageSize={1}
							total={Math.ceil(data.length / 9)}
						/>
					</div>
				</Content>
				<Footer style={{ textAlign: "center" }}>
					Ant Design ©2018 Created by Ant UED
				</Footer>
			</Layout>
		</div>
		</CurrentUserContext.Provider>
	);
	
};

//extra={<a href="#">More</a>}
