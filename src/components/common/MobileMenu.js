import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md"
import '../../styles/MobileMenu.scss'

const MobileMenu = ({ mobileMenu, setMobileMenu }) => {
	const handleClose = (mobileMenu) => {
		if (mobileMenu) {
			setMobileMenu(!mobileMenu);
		}
	}

	const handleLink = () => {
		setMobileMenu(!mobileMenu);
	}

	return ReactDom.createPortal(
		<>
			{mobileMenu && <div className="menudialog">
				<div>
					<ul>
						<li>
							<Link to="/" onClick={_ => handleLink()}>Không gian</Link>
						</li>
						<li>
							<Link to="/recent" onClick={_ => handleLink()}>Gần đây</Link>
						</li>
						<li>
							<Link to="/bookmark" onClick={_ => handleLink()}>Đánh dấu</Link>
						</li>
						<li>
							<Link to="/notification" onClick={_ => handleLink()}>Thông báo</Link>
						</li>
					</ul>
					<center>
						<button onClick={_ => handleClose(mobileMenu)}><MdClose /></button>
					</center>
				</div>
			</div>}
		</>,
		document.getElementById("portal")
	)
}

export default MobileMenu
