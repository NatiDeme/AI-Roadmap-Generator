import NatiLogo from '../../assets/img/NatiLogo.png';

function Navbar() {
  return (
    <nav className="border-b-2 border-gray-200 p-4 flex items-center">
      <img className='h-8' src={NatiLogo} alt="Logo" />
    </nav>
  )
}

export default Navbar