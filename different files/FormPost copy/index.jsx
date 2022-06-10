import React, { useState } from 'react';
//import "antd/dist/antd.css";
//import cn from "classnames";
import s from './styles.module.css';

const FormPost = () => {
 const [dataPost, setDataPost] = useState({
  title: '',
  text: '',
  image: '',
  tags: ''
 });

 function handleChange(e){
	setDataPost({...dataPost, [e.target.name]: e.target.value})
 }

 return (
  <form className={s.form}>
   <label htmlFor="title">Post title</label>
   <input type="text" name="title" id="title" value={dataPost.name} onChange={handleChange} />

   <label htmlFor="text">Text</label>
   <input type="text" name="text" id="text" value={dataPost.text} onChange={handleChange}/>

   <label htmlFor="image">Image</label>
   <input type="text" name="image" id="image" value={dataPost.image}onChange={handleChange} />

   <label htmlFor="tags">Tags </label>
   <input type="text" name="tags" id="tags" value={dataPost.tags} onChange={handleChange}/>

   <button className={s.btn}>Отправить</button>
  </form>
 );
};

export default FormPost;
