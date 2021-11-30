import '../../styles/Home.scss'
import { Link } from "react-router-dom";


const Section = ({ text, desc, svgLink, blueBg, haveButton, reverse }) => {
	return (
		<div class={"section" + (blueBg ? " bg-blue-400 text-white" : "")} style={{ flexDirection: reverse && 'row-reverse' }}>
			<div class="w-96 m-10">
				<h1 class="font-bold text-4xl">{text}</h1>
				<p>{desc}</p>
				{
					haveButton && (<Link to="/register">Đăng ký ngay</Link>)
				}
			</div>
			<object data={svgLink} class="w-9/12 md:w-4/12"></object>
		</div>
	)
}

export default Section
