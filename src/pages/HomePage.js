import { useState } from 'react';
import Button from '../components/Button';
import Modal from '../components/Modal';


const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function toggleLoading() {
    setIsLoading(!isLoading);
  }

  function toggleModal() {
    setShowModal(!showModal);
  }


  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello World!
      </h1>
      <div className="flex flex-col">
        <Button onClick={() => toggleLoading()} isLoading={isLoading} success title="Submit" />
        <Button onClick={() => toggleModal()} primary title="Show Modal" />
      </div>
      {showModal && <Modal content="Modal content" onClose={toggleModal} />}
    </div>
  );
}

export default HomePage;