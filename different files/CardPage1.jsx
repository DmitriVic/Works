import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./index.css";
//import { Layout, Menu,  Row, Col, Pagination } from "antd";
import { Layout} from "antd";
import api from "./utils/Api"
import postDatas from "../posts"

const ID_POST = "623c5ce37cf2b469b56a09c1"

import {Title} from "./components/Title/index";
//import { DataUser } from "./components/DataUser";
import { CurrentUserContext } from "./context/currentUser";
import { HeaderWrapper } from "./components/HeaderWrapper";
import { Post } from "./components/Post";


const { Header, Content, Footer } = Layout;



export const CardPage = () => {
	const [data, setData] = useState([]);
	const [rows, setRows] = useState([0, 9]);
	const [currentUser, setCurrentUser] = useState({})





	// Promise.all вернет 2 промиса, когда оба отработают.
	 useEffect(()=> {
		Promise.all([api.getPostById(ID_POST),api.getUser()])
		  .then(([postData, userData])=> {
			setData(postData);
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
				<Header className="header">	
				<HeaderWrapper/>
				</Header>
				<Content className="site-layout" style={{ padding: "0 50px", marginTop: 15 }} >
					<Title/>
					<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }} >
						<Post  {...data}  handlePostsLIke={handlePostsLIke}/>
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
