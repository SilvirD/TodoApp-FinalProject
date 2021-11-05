import ReactDom from 'react-dom'
import { useState } from 'react';
import '../../dist/styles/FormModal.css'

export default function FormModal({ open, cInfo, setCardInfo, onClose }) {
	const [cardName, setCardName] = useState("");
	const [cardDesc, setCardDesc] = useState("");

	if (!open) {
		return null;
	}

	const createNewCard = (e, cInfo) => {
		e.preventDefault();

		let newCard = {
			name: cardName,
			description: cardDesc,
		}

		setCardInfo(cInfo.push(newCard));
		onClose(!open);
	}

	return ReactDom.createPortal(
	// return (
		<>
			<div className="overlay">
				<div className="form-modal">
					<h1>Tạo không gian làm việc mới</h1>
					<hr />
					<form onSubmit={(e) =>
						createNewCard(e, cInfo)
					}>
						<label htmlFor="name">Tên không gian</label>
						<input type="text" id="name" name="name" value={cardName}
							onChange={(e) => setCardName(e.target.value)} />
						<label htmlFor="desc">Mô tả</label>
						<textarea type="text" id="desc" name="desc" value={cardDesc}
							onChange={(e) => setCardDesc(e.target.value)}></textarea>
						<input type="submit" id="submit" value="Tạo" />
						<button onClick={onClose}>Đóng</button>
					</form>
				</div>
			</div>
		</>,
		document.getElementById('portal')
	)
}
