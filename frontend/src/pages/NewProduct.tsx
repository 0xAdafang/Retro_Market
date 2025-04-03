import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import sacrifire from '../assets/sacrifire.jpg';

export default function NewProduct() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    if (!imageFile) return null;
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'retro-market');

    const res = await fetch('https://api.cloudinary.com/v1_1/dpahd7i2c/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const imageUrl = await uploadImage();

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          price: parseFloat(price),
          category,
          image: imageUrl,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Erreur lors de la création');

      toast.success('Produit mis en vente avec succès !');
      navigate('/');
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${sacrifire})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '3rem',
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="nes-container is-rounded with-title"
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#f0f0f0',
          padding: '2rem',
        }}
      >
        <p className="title">Mettre en vente</p>

        <div className="nes-field">
          <label htmlFor="title">Titre</label>
          <input id="title" className="nes-input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="nes-field" style={{ marginTop: '1rem' }}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="nes-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="nes-field" style={{ marginTop: '1rem' }}>
          <label htmlFor="price">Prix</label>
          <input
            id="price"
            type="number"
            step="0.01"
            className="nes-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="nes-field" style={{ marginTop: '1rem' }}>
          <label htmlFor="category">Catégorie</label>
          <div className="nes-select">
            <select required id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="" disabled>
                Choisir une catégorie
              </option>
              <option value="Console">Console</option>
              <option value="Jeu Vidéo">Jeu Vidéo</option>
              <option value="Arcade">Arcade</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="file_input" className="nes-btn">
            Choisir une image
          </label>
          <input
            id="file_input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          {imageFile && <p style={{ fontSize: '0.7rem' }}>{imageFile.name}</p>}
        </div>

        <button
          type="submit"
          className={`nes-btn is-primary ${loading ? 'is-disabled' : ''}`}
          style={{ marginTop: '1.5rem' }}
          disabled={loading}
        >
          {loading ? 'Envoi...' : 'Publier'}
        </button>
      </form>
    </div>
  );
}
