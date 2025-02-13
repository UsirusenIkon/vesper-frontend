import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthHeader } from 'react-auth-kit';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import {
  BsArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
import { SlSettings } from 'react-icons/sl';
import './details.css';
import Loader from '../Loader/Loader';
import { fetchCars } from '../../redux/cars/cars';
import ReservationForm from '../Reservation/ReservationForm';

const DetailsCarScreen = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const authHeader = useAuthHeader();
  const authentication = authHeader();
  const { id } = useParams();
  const navigate = useNavigate();
  const carDetails = useSelector((state) => state.cars);
  const { cars } = carDetails;
  const carss = cars?.find((c) => c.id === parseInt(id, 10));

  const [showReservationForm, setShowReservationForm] = useState(false);
  const handleReservationClick = () => {
    setShowReservationForm(true);
  };

  useEffect(() => {
    dispatch(fetchCars(authentication));
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, [authentication, dispatch]);

  if (loading) {
    return <Loader speed={2} />;
  }

  if (!cars) {
    return (
      <>
        <h2>Sorry</h2>
        <p>
          There is no car in Garage
        </p>

      </>
    );
  }

  return (
    <>
      {carss && (
        <div className="flex flex-col items-center md:justify-start justify-center w-full md:flex-row grow h-full lg:pt-20 lg:pb-10">
          <div className="grow  md:w-5/6 flex items-center justify-center md:px-10 rounded-full aspect-square">
            <img
              src={`/${carss?.image}`}
              alt={carss?.name}
              className="object-cover block rounded-full m-4 aspect-square w-[100%] md:ml-[40%]"
            />
          </div>
          <div className="flex flex-col w-full items-start md:items-end  md:mr-10 lg:px-0 text-center details">
            <div className="md:items-end details">
              <h1 className="md:text-right mb-4 text-3xl font-semibold text-slate-800">
                {carss?.name}
              </h1>
              <p className=" mb-10  md:text-right text-gray-500 text-sm">
                {carss?.description}
              </p>
            </div>
            <div className="flex flex-col grow md:items-end ">
              <div className="grow flex flex-col rounded-2xl overflow-hidden border">
                <div className="flex justify-center items-center gap-4 border-b">
                  <h3 className="font-bold my-4">Other Details</h3>
                </div>
                <ul className="grow-0 p-4">
                  <li className="odd:bg-gray-200 bg-gray-100 py-2 px-4">
                    <div className="flex items-center justify-between">
                      <span className="pr-10">Model</span>
                      <span className="text-right">
                        {carss?.model}
                      </span>
                    </div>
                  </li>
                  <li className="odd:bg-gray-200 bg-gray-100 py-2 px-4">
                    <div className="flex items-center justify-between">
                      <span className="pr-10">Year</span>
                      <span className="text-right">{carss?.year}</span>
                    </div>
                  </li>
                  <li className="odd:bg-gray-200 bg-gray-100 py-2 px-4">
                    <div className="flex items-center justify-between">
                      <span className="pr-10">Rent per day</span>
                      <span className="text-right">
                        $
                        {' '}
                        {carss?.price_per_day}
                      </span>
                    </div>
                  </li>
                  <li className="odd:bg-gray-200 bg-gray-100 py-2 px-4">
                    <div className="flex items-center justify-between">
                      <span className="pr-10">Owner</span>
                      <span className="text-right">{carss?.owner}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <p className="flex items-center gap-2 mt-1 margin">
                DISCOVER MORE MODELS
                {' '}
                <AiOutlineRight className="text-yellow-500" />
              </p>
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  className="res-btn bg-lime-500 text-white hover:bg-lime-400 px-6 py-2 rounded-full font-semibold min-w-[10rem] transition-colors border-2 border-transparent"
                  onClick={handleReservationClick}
                >
                  <div className="flex items-center gap-3 justify-center">
                    <SlSettings />
                    <span>Reserve</span>
                    <BsArrowRightCircleFill />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showReservationForm && (
      <ReservationForm
        carId={carss.id}
        carMake={carss.name}
        year={carss.year}
      />
      )}
      <div>
        <button
          className="fixed text-[1.8rem]
                              bottom-14 left-60 z-10 bg-[#98bd2a] text-white
                              rounded-full p-3 cursor-pointer
                              hidden md:block
                              "
          onClick={() => navigate(-1)}
          type="button"
        >
          <BsFillArrowLeftCircleFill />
        </button>
      </div>
    </>
  );
};

export default DetailsCarScreen;
