--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    title character varying NOT NULL,
    text character varying NOT NULL,
    colorhex character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projects_id_seq OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: read; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.read (
    id integer NOT NULL,
    title character varying NOT NULL,
    text character varying NOT NULL,
    "creatorId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.read OWNER TO postgres;

--
-- Name: read_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.read_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.read_id_seq OWNER TO postgres;

--
-- Name: read_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.read_id_seq OWNED BY public.read.id;


--
-- Name: timer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.timer (
    id integer NOT NULL,
    title character varying NOT NULL,
    text character varying NOT NULL,
    starttime timestamp without time zone NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    endtime timestamp without time zone,
    complete boolean NOT NULL,
    "projectId" integer NOT NULL
);


ALTER TABLE public.timer OWNER TO postgres;

--
-- Name: timer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.timer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.timer_id_seq OWNER TO postgres;

--
-- Name: timer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.timer_id_seq OWNED BY public.timer.id;


--
-- Name: timers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.timers (
    id integer NOT NULL,
    title character varying NOT NULL,
    text character varying NOT NULL,
    starttime timestamp without time zone NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.timers OWNER TO postgres;

--
-- Name: timers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.timers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.timers_id_seq OWNER TO postgres;

--
-- Name: timers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.timers_id_seq OWNED BY public.timers.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: read id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.read ALTER COLUMN id SET DEFAULT nextval('public.read_id_seq'::regclass);


--
-- Name: timer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timer ALTER COLUMN id SET DEFAULT nextval('public.timer_id_seq'::regclass);


--
-- Name: timers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timers ALTER COLUMN id SET DEFAULT nextval('public.timers_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, title, text, colorhex, "createdAt", "updatedAt") FROM stdin;
1	Work	body	#0000	2021-06-15 00:30:55.38937	2021-06-15 00:30:55.38937
2	Play	body	#1111	2021-06-17 00:50:30.565605	2021-06-17 00:50:30.565605
\.


--
-- Data for Name: read; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.read (id, title, text, "creatorId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: timer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.timer (id, title, text, starttime, "createdAt", "updatedAt", endtime, complete, "projectId") FROM stdin;
31	New Timer Test	TEST	2021-06-15 00:30:55.389	2021-06-16 14:48:34.03253	2021-06-17 13:06:47.97752	2021-06-17 13:06:47.965	t	1
32	Timer 2	TEST	2021-06-15 00:30:55.389	2021-06-16 19:53:11.871289	2021-06-17 13:06:52.530298	2021-06-17 13:06:52.525	t	1
33	Timer 3	TEST	2021-06-15 00:30:55.389	2021-06-16 20:04:08.26324	2021-06-17 13:06:54.261713	2021-06-17 13:06:54.256	t	1
34	new play test	test	2021-06-17 15:08:33.143	2021-06-17 15:08:33.196699	2021-06-17 15:09:08.183742	2021-06-17 15:09:08.177	t	2
\.


--
-- Data for Name: timers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.timers (id, title, text, starttime, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, username, email, password, "createdAt", "updatedAt") FROM stdin;
1	test2	test2@test.com	$argon2i$v=19$m=4096,t=3,p=1$YdqFGcTXrs+QjoIvCuakLw$kK2YWzLZQ0fCrz1VMWHh4VGqv5nt1NtBQ7WqalfhRRM	2021-05-31 13:44:12.506762	2021-05-31 13:44:12.506762
\.


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_id_seq', 2, true);


--
-- Name: read_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.read_id_seq', 1, false);


--
-- Name: timer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.timer_id_seq', 34, true);


--
-- Name: timers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.timers_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 1, true);


--
-- Name: projects PK_6271df0a7aed1d6c0691ce6ac50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY (id);


--
-- Name: read PK_a41d9620e3769b9c07b52fe1e77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.read
    ADD CONSTRAINT "PK_a41d9620e3769b9c07b52fe1e77" PRIMARY KEY (id);


--
-- Name: timer PK_b476163e854c74bff55b29d320a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timer
    ADD CONSTRAINT "PK_b476163e854c74bff55b29d320a" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: timers PK_d13ea0d2fe75274ca5a9576aae6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timers
    ADD CONSTRAINT "PK_d13ea0d2fe75274ca5a9576aae6" PRIMARY KEY (id);


--
-- Name: user UQ_78a916df40e02a9deb1c4b75edb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: timer FK_a4834ea05ab2215338b74ea9ede; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timer
    ADD CONSTRAINT "FK_a4834ea05ab2215338b74ea9ede" FOREIGN KEY ("projectId") REFERENCES public.projects(id);


--
-- Name: read FK_a99172db4e0598f9f16e633b4f5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.read
    ADD CONSTRAINT "FK_a99172db4e0598f9f16e633b4f5" FOREIGN KEY ("creatorId") REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

