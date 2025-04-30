import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import parcelBackground from '../assets/parcel.jpg';

interface CartItem {
  id: number;
  title: string;
  price: number;
  img: string;
  quantity: number;
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    address: '',
    postalCode: '',
    phone: '',
    paymentInfo: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:3001/api/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(setItems)
      .catch(err => {
        console.error('❌ Erreur chargement panier :', err);
        toast.error("Erreur de chargement du panier");
      });
  }, []);

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const tps = subtotal * 0.05;
  const tvq = subtotal * 0.09975;
  const total = subtotal + tps + tvq;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: items,
          shipping: formData,
        }),
      });
  
      if (!response.ok) throw new Error("Erreur lors de la commande");
  
      toast.success("Commande passée avec succès !");
  
      // 🧹 Vider le panier côté backend
      await fetch("http://localhost:3001/api/cart/clear", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      navigate("/orders");
    } catch (error) {
      toast.error("Échec de la commande");
      console.error("❌ Erreur handleSubmit :", error);
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${parcelBackground})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="nes-container is-rounded with-title"
        style={{ width: '100%', maxWidth: '600px', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
      >
        <p className="title">Validation de la commande</p>

        {[
          { id: 'firstname', label: 'Prénom' },
          { id: 'lastname', label: 'Nom' },
          { id: 'address', label: 'Adresse' },
          { id: 'postalCode', label: 'Code Postal' },
          { id: 'phone', label: 'Téléphone' },
          { id: 'paymentInfo', label: 'Carte (factice)', placeholder: '1234 5678 9876 5432' },
        ].map(({ id, label, placeholder }) => (
          <div className="nes-field" key={id} style={{ marginBottom: '1rem' }}>
            <label htmlFor={id}>{label}</label>
            <input
              type="text"
              id={id}
              name={id}
              className="nes-input"
              value={formData[id as keyof typeof formData]}
              placeholder={placeholder || ''}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <section style={{ marginTop: '2rem' }}>
          <h3>Résumé :</h3>
          <p>Sous-total : {subtotal.toFixed(2)} $</p>
          <p>TPS (5%) : {tps.toFixed(2)} $</p>
          <p>TVQ (9.975%) : {tvq.toFixed(2)} $</p>
          <p><strong>Total TTC : {total.toFixed(2)} $</strong></p>
        </section>

        <button
          type="submit"
          className="nes-btn is-success"
          style={{ marginTop: '2rem', width: '100%' }}
        >
          Passer la commande
        </button>

        <button
          type="button"
          className="nes-btn is-warning"
          style={{ marginTop: '1rem', width: '100%' }}
          onClick={() => navigate('/cart')}
        >
          Retour au panier
        </button>
      </form>
    </div>
  );
}
