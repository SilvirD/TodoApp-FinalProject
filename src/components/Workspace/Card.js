const Card = ({ name, description }) => {
	const colorPallete = [
		"bg-red-400",
		"bg-yellow-400",
		"bg-green-400",
		"bg-blue-400",
		"bg-indigo-400",
		"bg-purple-400",
		"bg-pink-400"
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
