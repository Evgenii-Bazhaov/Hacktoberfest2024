import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { resetModal } from './slice/modalSlice';
import { setScreen } from './slice/changeScreenSlice';
import { useEffect } from 'react';
import Modal from './Container/Modals/Modal'
import Navbar from './Component/Navbar/Navbar'
import Homepage from './Container/Homepage/Homepage'
import Questions from './Container/Questions/Questions'
import Thankyou from './Container/Thankyou/Thankyou'

const App = () => {
  const { screen } = useSelector((state) => state.screen);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(resetModal())
      dispatch(setScreen({ screenName: "homepage" }))
    }, 1500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderScreen = (screen) => {
    switch (screen) {
      case "homepage": return <Homepage />
      case "loader": return <Modal type="loader" fullScreen={true} />
      case "questions": return <Questions />
      case "thankyou": return <Thankyou />
      default: return <Homepage />
    }
  }

  return (
    <div className="app">
      <Navbar />
      {renderScreen(screen)}
    </div>
  );
}

export default App;
