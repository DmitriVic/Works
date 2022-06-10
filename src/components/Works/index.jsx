import React from "react";
//import { HeartTwoTone} from "@ant-design/icons/lib/icons";
//import "antd/dist/antd.css";
//import cn from "classnames";
import s from "./styles.module.css";

import binary from "./img/Binary.png"
import dance from "./img/Dance.png"
import GrannyCats from "./img/Cats.png"
import GreenCorp from "./img/GreenCorp.png"
import ReactProject from "./img//Blog.png"




export const Works = () => {
  return (
    <>
         <div className={s.container}>
				<div className={s.title}>Мои работы</div>
						<div className={s.verstka}>
							<div className={s.subtitle}>JavaScript </div>
							<div className={s.works}>
								<div className={s.work}>
									<div className={s['work-name']}>Binary</div>
									<a href="https://dmitrivic.github.io/binary/"><img className={s.img} src={binary} alt="" /></a>
								</div>
								<div className={s.work}>
									<div className={s['work-name']}>Dance</div>
									<a href="https://dmitrivic.github.io/Dance/"><img className={s.img} src={dance} alt="" /></a>
								</div>
								<div className={s.work}>
									<div className={s['work-name']}>Granny-Cats</div>
									<a href="https://dmitrivic.github.io/Granny-Cats/"><img className={s.img} src={GrannyCats} alt="" /></a>
								</div>
								<div className={s.work}>
									<div className={s['work-name']}>GreenCorp</div>
									<a href="https://dmitrivic.github.io/green-corp-landing/"><img className={s.img} src={GreenCorp} alt="" /></a>
								</div>
							</div>
						</div>
						<div className={s.verstka}>
							<div className={s.subtitle}>React </div>
							<div className={s.works}>
								<div className={s.work}>
									<div className={s['work-name']}>Info-Blog</div>
									<a href="https://dmitrivic.github.io/School-Posts-v-2.4-/"><img className={s.img} src={ReactProject} alt="" /></a>
								</div>
							
							</div>
							
						</div>
						<div className={s.box}></div>
			</div>
    </>
  );
};
