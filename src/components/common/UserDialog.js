import ReactDom from "react-dom";
import '../../styles/UserDialog.scss'
import { FaRegUserCircle } from "react-icons/fa";

const userDialog = ({ userModal, setUserModal }) => {
	const handleClose = (userModal) => {
		console.log(userModal)
		if (userModal) {
			setUserModal(!userModal)
		}
	}

	return ReactDom.createPortal(
		<>
		{userModal && <div className="overlay">
			<div className="dialog">
				<div className="userinfo">
					<span><FaRegUserCircle /></span> <span>Nguyễn Văn A</span>
				</div>
				<div className="flex">
					<button className="logout-btn">
						Đăng xuất
					</button>
					<button onClick={_ => handleClose(userModal)}>
						Trở lại
					</button>
				</div>
			</div>
		</div> }
		</>,
		document.getElementById("portal")
	)
}

export default userDialog
