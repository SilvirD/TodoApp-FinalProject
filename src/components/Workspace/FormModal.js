// import ReactDom from 'react-dom'
import '../../dist/styles/FormModal.css'

export default function FormModal({ open, onClose }) {
	if (!open) {
		return null;
	}
	// return ReactDom.createPortal(
	return (
		<>
			<div className="overlay">
				<div className="form-modal">
					<h1>Tạo không gian làm việc mới</h1>
					<hr />
					<form>
						<label htmlFor="name">Tên không gian</label>
						<input type="text" id="name" name="name" />
						<label htmlFor="desc">Mô tả</label>
						<textarea type="text" id="desc" name="desc"></textarea>
						<input type="submit" id="submit" value="Tạo" />
						<button onClick={onClose}>Đóng</button>
					</form>
				</div>
			</div>
		</>
		// document.getElementById('portal')
	)
}
