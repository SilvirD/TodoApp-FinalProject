import ReactDom from "react-dom";
import '../../styles/UserDialog.scss'
import { apiClient } from "../../helper/api_client";
import { FaRegUserCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const UserDialog = ({ userModal, setUserModal, loginState, setLogState }) => {
	const history = useHistory();

	const handleClose = (userModal) => {
		if (userModal) {
			setUserModal(!userModal)
		}
	}

	const handleLogout = () => {
		localStorage.removeItem('tokenLogin')
		if (userModal) {
			setUserModal(!userModal)
			setLogState(localStorage.getItem('tokenLogin'))
		}
		history.push('/login')
	}

	const moveToLogin = () => {
		if (userModal) {
			setUserModal(!userModal)
		}
		history.push('/login')		
	}

	return ReactDom.createPortal(
		<>
		{userModal && <div className="overlay">
			<div className="dialog">
				{ loginState && <div className="userinfo">
					<span><FaRegUserCircle /></span> <span>Nguyễn Văn A</span>
				</div>}
				{ !loginState && <span>Chưa có người dùng đăng nhập</span> }
				<div className="flex">
					{ loginState && <button className="logout-btn" onClick={_ => handleLogout()}>
						Đăng xuất
					</button>}
					{ !loginState && <button className="logout-btn" onClick={_ => moveToLogin()}>
						Đăng nhập
					</button>}
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

export default UserDialog
