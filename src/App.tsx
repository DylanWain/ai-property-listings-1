import axios from 'axios';
import { useState } from 'react';
import { CiDollar, CiPaperplane } from 'react-icons/ci';
import { MdLightbulbOutline } from 'react-icons/md';
import { PiMapPinArea } from 'react-icons/pi';
import { TbBed } from 'react-icons/tb';
import './App.css';
import { ListingCard } from './components/ListingCard/ListingCard';
import RequestModal from './components/RequestModal/RequestModal';
import ThemeToggle from './components/ThemeToggle';
import { Listing, ListingRecord, mapListings } from './utils';

const presetCommands = [
  { command: 'Tell me which city is best for me', icon: <PiMapPinArea size={20} /> },
  { command: 'Which apartments can I afford?', icon: <CiDollar size={20} /> },
  { command: 'Help me find the best 2 bedroom under $4k', icon: <TbBed size={20} /> },
  { command: 'Find me a place that fits my daily routine', icon: <MdLightbulbOutline size={20} /> },
];

const exampleListings = [
  { title: "AVA Burbank",
    price: "$2,287 - $2,602",
    address: "McNeil, Burbank, CA 91505",
    mainImg: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subImgs: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    pros: [
      "In unit laundry available",
      "Centrally located in Burbank",
    ],
    link: "https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/"
  },
  { title: "Kenwood Mews",
    price: "$2,312 - $2,470",
    address: "McNeil, Burbank, CA 91505",
    mainImg: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subImgs: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    pros: [
      "Located in residential Burbank with quick access to CA-134",
      "Pet friendly and smoke-free community",
    ],
    link: "https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/"
  },
  { title: "Luxe at Burbank",
    price: "$2,195",
    address: "1731 Rogers Place, Burbank, CA 91504",
    mainImg: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subImgs: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    pros: [
      "Within budget at $2,195",
      "Located in preferred Burbank, CA",
    ],
    link: "https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/"
  },
  { title: "AVA Burbank",
    price: "$2,287 - $2,602",
    address: "McNeil, Burbank, CA 91505",
    mainImg: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subImgs: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    pros: [
      "In unit laundry available",
      "Centrally located in Burbank",
    ],
    link: "https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/"
  },
  { title: "AVA Burbank",
    price: "$2,287 - $2,602",
    address: "McNeil, Burbank, CA 91505",
    mainImg: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subImgs: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    pros: [
      "In unit laundry available",
      "Centrally located in Burbank",
    ],
    link: "https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/"
  },
  { title: "AVA Burbank",
    price: "$2,287 - $2,602",
    address: "McNeil, Burbank, CA 91505",
    mainImg: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subImgs: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    pros: [
      "In unit laundry available",
      "Centrally located in Burbank",
    ],
    link: "https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/"
  },
  { title: "AVA Burbank",
    price: "$2,287 - $2,602",
    address: "McNeil, Burbank, CA 91505",
    mainImg: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subImgs: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    pros: [
      "In unit laundry available",
      "Centrally located in Burbank",
    ],
    link: "https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/"
  },
  { title: "AVA Burbank",
    price: "$2,287 - $2,602",
    address: "McNeil, Burbank, CA 91505",
    mainImg: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subImgs: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    pros: [
      "In unit laundry available",
      "Centrally located in Burbank",
    ],
    link: "https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/"
  },
  { title: "Luxe at Burbank",
    price: "$2,195",
    address: "1731 Rogers Place, Burbank, CA 91504",
    mainImg: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subImgs: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    pros: [
      "Within budget at $2,195",
      "Located in preferred Burbank, CA",
    ],
    link: "https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/"
  },
  { title: "AVA Burbank",
    price: "$2,287 - $2,602",
    address: "McNeil, Burbank, CA 91505",
    mainImg: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subImgs: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    pros: [
      "In unit laundry available",
      "Centrally located in Burbank",
    ],
    link: "https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/"
  },
  { title: "AVA Burbank",
    price: "$2,287 - $2,602",
    address: "McNeil, Burbank, CA 91505",
    mainImg: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subImgs: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    pros: [
      "In unit laundry available",
      "Centrally located in Burbank",
    ],
    link: "https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/"
  },
  { title: "Luxe at Burbank",
    price: "$2,195",
    address: "1731 Rogers Place, Burbank, CA 91504",
    mainImg: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subImgs: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    pros: [
      "Within budget at $2,195",
      "Located in preferred Burbank, CA",
    ],
    link: "https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/"
  },
  { title: "Luxe at Burbank",
    price: "$2,195",
    address: "1731 Rogers Place, Burbank, CA 91504",
    mainImg: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subImgs: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    pros: [
      "Within budget at $2,195",
      "Located in preferred Burbank, CA",
    ],
    link: "https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/"
  },
  { title: "Luxe at Burbank",
    price: "$2,195",
    address: "1731 Rogers Place, Burbank, CA 91504",
    mainImg: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subImgs: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    pros: [
      "Within budget at $2,195",
      "Located in preferred Burbank, CA",
    ],
    link: "https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/"
  },
  { title: "Luxe at Burbank",
    price: "$2,195",
    address: "1731 Rogers Place, Burbank, CA 91504",
    mainImg: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subImgs: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    pros: [
      "Within budget at $2,195",
      "Located in preferred Burbank, CA",
    ],
    link: "https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/"
  },
  { title: "Luxe at Burbank",
    price: "$2,195",
    address: "1731 Rogers Place, Burbank, CA 91504",
    mainImg: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subImgs: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    pros: [
      "Within budget at $2,195",
      "Located in preferred Burbank, CA",
    ],
    link: "https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/"
  },
  { title: "Luxe at Burbank",
    price: "$2,195",
    address: "1731 Rogers Place, Burbank, CA 91504",
    mainImg: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subImgs: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    pros: [
      "Within budget at $2,195",
      "Located in preferred Burbank, CA",
    ],
    link: "https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/"
  },
  { title: "Luxe at Burbank",
    price: "$2,195",
    address: "1731 Rogers Place, Burbank, CA 91504",
    mainImg: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subImgs: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    pros: [
      "Within budget at $2,195",
      "Located in preferred Burbank, CA",
    ],
    link: "https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/"
  },
  { title: "Luxe at Burbank",
    price: "$2,195",
    address: "1731 Rogers Place, Burbank, CA 91504",
    mainImg: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subImgs: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    pros: [
      "Within budget at $2,195",
      "Located in preferred Burbank, CA",
    ],
    link: "https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/"
  },
];

function App() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [visibleListings, setVisibleListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [loadingCommand, setLoadingCommand] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const pageNum = 1;

  const submitPreference = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const preferences = formData.get('preferences') as string;

    // todo: integrate the backend directly into this project so the temporary vercel endpoint isn't needed
    const res = await axios.post('https://vite-react-theta-two-40.vercel.app/search', { text: preferences, page: 1 });
    const listingRecords = res.data.matches as ListingRecord[];
    const listings = mapListings(listingRecords);

    console.log("Listings:", listings);

    setListings(listings);
    setVisibleListings(listings.slice(0, 6));

    setIsLoading(false);
    setIsDataLoaded(true);
  };

  const loadMoreListings = () => {
    const nextListings = listings.slice(visibleListings.length, visibleListings.length + 6);
    setVisibleListings(prevListings => [...prevListings, ...nextListings]);
  };

  const commandClick = async (command: string) => {
    setLoadingCommand(true);

    const res = await axios.post('https://vite-react-theta-two-40.vercel.app/search', { text: command, page: 1 });
    const listingRecords = res.data.matches as ListingRecord[];
    const listings = mapListings(listingRecords);

    setListings(listings);
    setVisibleListings(listings.slice(0, 6));

    setLoadingCommand(false);
  };

  return (
    <>
      {loadingCommand && <div className='large-loader'></div>}
      {showModal && <RequestModal setShowModal={setShowModal} />}
      <header className='header'>
        <h1 className='header-title' onClick={() => window.location.reload()}>Finding Places</h1>
        <ThemeToggle />
      </header>
      {listings.length === 0 && !isDataLoaded
        ? <>
            <h2 className='title'>AI-Powered home search and property inspection</h2>
            <div className='description-container'>
              <p className='description'>I'll help you find your ideal apartment. Share your preferences for location, budget, and features, and I'll do the rest</p>
              <p className='description'>Or I can help you in other ways shown below!</p>
            </div>
            <div className='command-grid-container'>
              {presetCommands.map((section, index) => (
                <div key={index} className='command-container' onClick={() => commandClick(section.command)}>
                  <div className='command-icon'>{section.icon}</div>
                  <p className='command'>{section.command}</p>
                </div>
              ))}
            </div>
          </>
        : <div className="hide-elements" />}
      <form onSubmit={submitPreference} className='preferences-form'>
        <input className='preferences-input' type="text" name="preferences" placeholder='Tell me your preferences' />
        <button type='submit' className='submit-button' disabled={isLoading || loadingCommand}>
          {isLoading ? <div className='loader'></div> : <CiPaperplane size={25} style={{ strokeWidth: 0.5}} />}
        </button>
      </form>
      <div className='powered-by-container'>
        <small className='powered-by'>Powered by GPT-4</small>
      </div>
      {listings.length > 0
        ? <>
            <div className='listing-grid-container'>
              {visibleListings.map((listing, index) => (
                <ListingCard key={index} listing={listing} />
              ))}
            </div>
            {visibleListings.length < listings.length
              ? <button className='load-more-button' onClick={loadMoreListings}>Load more</button>
              : null}
          </>
        : null}
    </>
  )
}

export default App
