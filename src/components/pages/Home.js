import Section from "../Home/Section"
import Footer from '../Home/Footer'
import content from '../Home/content'

const Home = () => {
	return (
		<>
			{
				content.map(element => {
					return (
						<Section haveButton={element.haveButton} blueBg={element.haveBlueBg} reverse={element.flexReverse}
							svgLink={element.svg} text={element.title} desc={element.desc} />
					)
				})
			}
			<Footer />
		</>
	)
}

export default Home
