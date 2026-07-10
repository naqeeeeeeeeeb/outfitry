import { useState, useEffect } from 'react';
import { Menu, Bell, Home, Shirt, Plus, User, Sparkles } from 'lucide-react';
import './App.css';

function App() {
  const [outfit, setOutfit] = useState({ top: null, bottom: null, shoe: null });
  const [closet, setCloset] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [itemCategory, setItemCategory] = useState('top');
  const [savedOutfits, setSavedOutfits] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('closet');
    if (saved) setCloset(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('closet', JSON.stringify(closet));
  }, [closet]);

  return (
    <div className="app">
      <header>
        <span><Menu size={20} /></span>
        <div>
          <h1>Outfitry</h1>
          <p>Plan.Style.Shine</p>
        </div>
        <span><Bell size={20} /></span>
      </header>

      <nav>
        <button>All</button>
        <button>Tops</button>
        <button>Bottom</button>
        <button>Shoes</button>
      </nav>

      <section>
        <h2>My Wardrobe</h2>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="e.g. Pink Cardigan"
        />
        <select value={itemCategory} onChange={(e) => setItemCategory(e.target.value)}>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
          <option value="shoes">Shoes</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onloadend = () => setItemImage(reader.result);
            reader.readAsDataURL(file);
          }}
        />
        <button onClick={() => {
          if (itemName.trim() === '') return;
          setCloset([...closet, { id: Date.now(), name: itemName, image: itemImage, category: itemCategory }]);
          setItemName('');
          setItemImage(null);
        }}>Add</button>

        <div>
          {closet.map((item) => (
            <div key={item.id}>
              {item.image && <img src={item.image} alt={item.name} style={{ width: '100%', borderRadius: '12px' }} />}
              {item.name}
              <button onClick={() => setCloset(closet.filter((i) => i.id !== item.id))}>✕</button>
            </div>
          ))}
        </div>
      </section>

      <button onClick={() => {
        const myTops = closet.filter((i) => i.category === 'top');
        const myBottoms = closet.filter((i) => i.category === 'bottom');
        const myShoes = closet.filter((i) => i.category === 'shoes');

        if (myTops.length === 0 || myBottoms.length === 0 || myShoes.length === 0) {
          alert('Add at least one top, one bottom, and one pair of shoes to generate an outfit!');
          return;
        }

        const randomTop = myTops[Math.floor(Math.random() * myTops.length)];
        const randomBottom = myBottoms[Math.floor(Math.random() * myBottoms.length)];
        const randomShoe = myShoes[Math.floor(Math.random() * myShoes.length)];
        setOutfit({ top: randomTop, bottom: randomBottom, shoe: randomShoe });
      }}>
        <Sparkles size={18} /> Generate Outfit
      </button>

      <section>
        <h2>Featured Outfit</h2>
        <div>
          <div>
            {outfit.top?.image && <img src={outfit.top.image} alt="" style={{ width: '100%', borderRadius: '12px' }} />}
            {outfit.top?.name || 'Add items to generate'}
          </div>
          <div>
            {outfit.bottom?.image && <img src={outfit.bottom.image} alt="" style={{ width: '100%', borderRadius: '12px' }} />}
            {outfit.bottom?.name || ''}
          </div>
          <div>
            {outfit.shoe?.image && <img src={outfit.shoe.image} alt="" style={{ width: '100%', borderRadius: '12px' }} />}
            {outfit.shoe?.name || ''}
          </div>
        </div>
        <p>Sweet & Casual</p>
        <p>Perfect for a day out!</p>
        <button onClick={() => {
          if (!outfit.top || !outfit.bottom || !outfit.shoe) return;
          setSavedOutfits([...savedOutfits, outfit]);
        }}>♡ Save</button>
      </section>

      <section>
        <h2>Saved Outfits</h2>
        <div>
          {savedOutfits.map((o, index) => (
            <div key={index}>{o.top?.name}, {o.bottom?.name}, {o.shoe?.name}</div>
          ))}
        </div>
      </section>

      <footer>
        <span><Home size={18} /> Home</span>
        <span><Shirt size={18} /> Wardrobe</span>
        <span><Plus size={18} /></span>
        <span><Shirt size={18} /> Outfits</span>
        <span><User size={18} /> Profile</span>
      </footer>
    </div>
  );
}

export default App;