

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    user_id integer,
    product_id integer,
    added_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_items_id_seq OWNER TO postgres;

--
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer,
    product_id integer
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(20) DEFAULT 'pending'::character varying
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: password_resets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.password_resets (
    id integer NOT NULL,
    user_id integer,
    token character varying(255) NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.password_resets OWNER TO postgres;

--
-- Name: password_resets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.password_resets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.password_resets_id_seq OWNER TO postgres;

--
-- Name: password_resets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.password_resets_id_seq OWNED BY public.password_resets.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    category character varying(100) NOT NULL,
    user_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    image text
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(50) DEFAULT 'user'::character varying,
    username character varying(50),
    prenom character varying(100),
    nom character varying(100),
    genre character varying(50)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: password_resets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_resets ALTER COLUMN id SET DEFAULT nextval('public.password_resets_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_items (id, user_id, product_id, added_at) FROM stdin;
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, order_id, product_id) FROM stdin;
1	1	11
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, user_id, created_at, status) FROM stdin;
1	1	2025-04-02 21:23:45.067959	pending
\.


--
-- Data for Name: password_resets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.password_resets (id, user_id, token, expires_at, created_at) FROM stdin;
1	2	9cd114c9-587e-41dc-8f1c-7e99a34a1b2b	2025-04-01 20:31:58.234	2025-04-01 19:31:58.24012
2	2	fbe1419f-cf8a-4c8b-bb36-c6333a6777e5	2025-04-01 20:43:07.047	2025-04-01 19:43:07.050077
3	2	5fe1cb7a-c33d-4991-8f1f-10c1e8757021	2025-04-01 20:46:00.912	2025-04-01 19:46:00.914543
4	2	b1edd7ed-3855-494b-8270-3a0e68d290b9	2025-04-01 20:54:00.239	2025-04-01 19:54:00.23965
5	2	4ae9932c-b0d5-4a31-b72e-18301ec797b8	2025-04-01 20:55:43.178	2025-04-01 19:55:43.190898
6	2	9d8a9c25-4cef-4a39-a5af-c7730e3d3a55	2025-04-01 20:59:46.828	2025-04-01 19:59:46.842067
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, title, description, price, category, user_id, created_at, image) FROM stdin;
9	Earthbound	jeux Snes, occasion, boite un peu abimé, fonctionne tres bien	2750.00	SNES	2	2025-03-31 21:50:08.106416	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743469207/earthbound_y7m8n1.jpg
1	Dreamcast + jeux	Console Dreamcast avec 2 manettes et 5 jeux originaux.	450.33	Console	1	2025-03-28 19:51:58.268697	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743205619/dreamcast_aqwtyu.jpg
2	Zelda: A Link to the Past	Cartouche SNES en excellent état avec boîte.	344.94	Jeu Vidéo	1	2025-03-28 19:51:58.268697	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743205621/zelda_fysbnb.jpg
3	Resident Evil 1	Version PS1, complète avec manuel. Fonctionne parfaitement.	89.58	Jeu Vidéo	1	2025-03-28 19:51:58.268697	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743205620/re1_hf9nrk.jpg
4	Machine Arcade Tron	Machine arcade collector en état de fonctionnement.	8799.99	Arcade	1	2025-03-28 19:51:58.268697	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743205621/Tron_py9gdq.jpg
5	Pokémon Crystal JP	Cartouche japonaise, sauvegarde fonctionnelle.	374.27	Jeu Vidéo	1	2025-03-28 19:51:58.268697	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743205619/cristal_av5sp1.jpg
6	Suikoden II	Rare RPG PS1 en version française.	927.49	Jeu Vidéo	1	2025-03-28 19:51:58.268697	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743205620/suikoden_2_fugerw.jpg
7	Dragon Quest III	Version Famicom. Boîte + manuel inclus.	699.99	Jeu Vidéo	1	2025-03-28 19:51:58.268697	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743205619/dq3_fanizq.jpg
8	Chrono Trigger II	Version fan-made avec doublage anglais.	299.99	Jeu Vidéo	1	2025-03-28 19:51:58.268697	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743205619/chrono_zwku2f.jpg
10	Musha	Occasion presque neuf boite + manuel + jeu, parfait pour collection	1000.00	Megadrive	2	2025-03-31 21:50:08.106416	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743469207/musha_eu7owt.jpg
11	Rule of Rose	Neuf sous blister Japonais	700.00	PS2	2	2025-03-31 21:50:08.106416	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743469207/ruleofrose_ho9ox2.jpg
12	Vandal Heart II	Neuf sous blister, pour collectionneur	227.00	PS1	2	2025-03-31 21:50:08.106416	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743469207/vandalheart2_vixdmq.jpg
13	Nintendo 64 Pikachu	Occasion, complete, fonctionne tres bien	669.00	N64	2	2025-03-31 21:50:08.106416	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743469207/N64_tesha1.jpg
14	Steel Battalion	Comme neuf, pack complet	590.00	XBOX	2	2025-03-31 21:50:08.106416	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743469207/steelbatalion_idtvfx.jpg
15	Canon Spike	Neuf Version JP, je garde la figurine :D	485.00	Dreamcast	2	2025-03-31 21:50:08.106416	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743469207/canonspike_smbxbn.webp
16	Castlevania: Symphony of the Night	Version originale PS1, complet avec jaquette et manuel.	499.99	PS1	3	2025-04-01 21:33:18.878649	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743557156/WhatsAppImage2024-06-05at14.41.57_1024x1024_m7y8ad.webp
17	Xenosaga III	Version PS2 complète en très bon état, rare.	349.99	PS2	3	2025-04-01 21:33:18.878649	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743557155/s-l1200_1_jazcgk.jpg
18	Neo Geo	Console Neo Geo avec boite originale, fonctionne parfaitement.	1200.00	Console	3	2025-04-01 21:33:18.878649	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743557155/s-l1200_msqcke.jpg
19	The Witcher 2 Collector	Version collector scellée, jamais ouverte.	279.99	PC	3	2025-04-01 21:33:18.878649	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743557155/The-Witcher-2-Assassins-of-Kings-Enhanced-Edition_asz2da.webp
20	Metal Gear Solid 2 Collector	Pack collector complet avec figurine et bonus.	199.00	PS2	3	2025-04-01 21:33:18.878649	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743557155/metal2_g6pfcc.jpg
21	Metal Gear Solid 1 Collector	Version collector complète, disque et boîte en très bon état.	299.00	PS1	3	2025-04-01 21:33:18.878649	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743557155/71HUUiIJccL_mdvrky.jpg
22	Stadium Events	Cartouche NES ultra rare, version originale.	8999.00	NES	3	2025-04-01 21:33:18.878649	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743557155/s-l400_crd1ko.jpg
23	Pokemon Saphir Ruby Gamecube	Pack rare GameCube incluant les jeux Saphir & Rubis.	849.00	Gamecube	3	2025-04-01 21:33:18.878649	https://res.cloudinary.com/dpahd7i2c/image/upload/v1743557155/s-l400_1_t9b3hc.jpg
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, role, username, prenom, nom, genre) FROM stdin;
1	terence.sionneau@gmail.com	$2b$10$snD3Vw2p6JWkW6dDWcphY.xgkP//P9QHAQgIQu3swgC1nmUpsXPvK	admin	admin	Terence	Sionneau	homme
2	imadafang@gmail.com	$2b$10$uvGSnoo4q6D/9.4qkDnujuUX24RupaV0aqIQ6HPAb9ggf0NV92./y	user	Adafang	Ada	Fang	femme
3	izokha@live.fr	$2b$10$ZYM3zPrWqMCqCXVvsi/xnO0lZZvRa0v75xPQDD8R.N1G8FVXRwxm.	user	Killua41	Killua	Zoldick	homme
\.


--
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 13, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 1, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, true);


--
-- Name: password_resets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.password_resets_id_seq', 7, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 23, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: password_resets password_resets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: cart_items cart_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: cart_items cart_items_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: password_resets password_resets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: products products_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

