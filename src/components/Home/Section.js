import '../../styles/Home.scss'


const Section = ({ text, desc, svgLink, blueBg, haveButton, flexReverse }) => {
	return (
		<div class={"section " + (blueBg ? "bg-blue-400 text-white" : "") + (flexReverse ? "flex-row-reverse" : "")}>
			<div class="w-96 m-10">
				<h1 class="font-bold text-4xl">{text}</h1>
				<p>{desc}</p>
				{
					haveButton && (<button>Đăng ký ngay</button>)
				}
			</div>
			<object data={svgLink} class="w-9/12 md:w-4/12"></object>
		</div>
	)
}

export default Section
