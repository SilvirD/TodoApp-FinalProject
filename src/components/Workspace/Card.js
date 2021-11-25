const Card = ({ name, description }) => {
	const colorPallete = [
		"bg-red-200",
		"bg-yellow-200",
		"bg-green-200",
		"bg-blue-200",
		"bg-indigo-200",
		"bg-purple-200",
		"bg-pink-200"
	]

	return (
		<div className="card">
			<div className={colorPallete[Math.floor(Math.random() * colorPallete.length)] + " select-none h-20"}>
			⠀
			</div>
			<div className="m-4">
				<h1>{name}</h1>
				<p>{description}</p>
			</div>
		</div>
	)
}

export default Card
