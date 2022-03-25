--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

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

--
-- TOC entry 5 (class 2615 OID 16477)
-- Name: ProjetWeb; Type: SCHEMA; Schema: -; Owner: romainfrezier
--

CREATE SCHEMA "ProjetWeb";


ALTER SCHEMA "ProjetWeb" OWNER TO romainfrezier;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16538)
-- Name: competitions; Type: TABLE; Schema: ProjetWeb; Owner: romainfrezier
--

CREATE TABLE "ProjetWeb".competitions (
    id integer NOT NULL,
    "competDate" date NOT NULL,
    sport integer NOT NULL,
    "competName" character varying NOT NULL,
    place character varying NOT NULL
);


ALTER TABLE "ProjetWeb".competitions OWNER TO romainfrezier;

--
-- TOC entry 213 (class 1259 OID 16537)
-- Name: COMPET_id_seq; Type: SEQUENCE; Schema: ProjetWeb; Owner: romainfrezier
--

CREATE SEQUENCE "ProjetWeb"."COMPET_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ProjetWeb"."COMPET_id_seq" OWNER TO romainfrezier;

--
-- TOC entry 3635 (class 0 OID 0)
-- Dependencies: 213
-- Name: COMPET_id_seq; Type: SEQUENCE OWNED BY; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER SEQUENCE "ProjetWeb"."COMPET_id_seq" OWNED BY "ProjetWeb".competitions.id;


--
-- TOC entry 212 (class 1259 OID 16519)
-- Name: items; Type: TABLE; Schema: ProjetWeb; Owner: romainfrezier
--

CREATE TABLE "ProjetWeb".items (
    id integer NOT NULL,
    "itemName" character varying NOT NULL,
    usage integer,
    "sportId" integer NOT NULL,
    "user" integer NOT NULL
);


ALTER TABLE "ProjetWeb".items OWNER TO romainfrezier;

--
-- TOC entry 211 (class 1259 OID 16518)
-- Name: MATERIEL_id_seq; Type: SEQUENCE; Schema: ProjetWeb; Owner: romainfrezier
--

CREATE SEQUENCE "ProjetWeb"."MATERIEL_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ProjetWeb"."MATERIEL_id_seq" OWNER TO romainfrezier;

--
-- TOC entry 3636 (class 0 OID 0)
-- Dependencies: 211
-- Name: MATERIEL_id_seq; Type: SEQUENCE OWNED BY; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER SEQUENCE "ProjetWeb"."MATERIEL_id_seq" OWNED BY "ProjetWeb".items.id;


--
-- TOC entry 210 (class 1259 OID 16479)
-- Name: sports; Type: TABLE; Schema: ProjetWeb; Owner: romainfrezier
--

CREATE TABLE "ProjetWeb".sports (
    id integer NOT NULL,
    "sportName" character varying NOT NULL,
    "sportPeriod" character varying NOT NULL
);


ALTER TABLE "ProjetWeb".sports OWNER TO romainfrezier;

--
-- TOC entry 209 (class 1259 OID 16478)
-- Name: TYPE_SPORT_id_seq; Type: SEQUENCE; Schema: ProjetWeb; Owner: romainfrezier
--

CREATE SEQUENCE "ProjetWeb"."TYPE_SPORT_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ProjetWeb"."TYPE_SPORT_id_seq" OWNER TO romainfrezier;

--
-- TOC entry 3637 (class 0 OID 0)
-- Dependencies: 209
-- Name: TYPE_SPORT_id_seq; Type: SEQUENCE OWNED BY; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER SEQUENCE "ProjetWeb"."TYPE_SPORT_id_seq" OWNED BY "ProjetWeb".sports.id;


--
-- TOC entry 215 (class 1259 OID 16586)
-- Name: USERS_id_seq; Type: SEQUENCE; Schema: ProjetWeb; Owner: romainfrezier
--

CREATE SEQUENCE "ProjetWeb"."USERS_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ProjetWeb"."USERS_id_seq" OWNER TO romainfrezier;

--
-- TOC entry 219 (class 1259 OID 16757)
-- Name: activities; Type: TABLE; Schema: ProjetWeb; Owner: romainfrezier
--

CREATE TABLE "ProjetWeb".activities (
    id integer NOT NULL,
    "activityName" character varying NOT NULL,
    "sportId" integer NOT NULL,
    date date NOT NULL,
    item integer,
    "user" integer NOT NULL
);


ALTER TABLE "ProjetWeb".activities OWNER TO romainfrezier;

--
-- TOC entry 218 (class 1259 OID 16756)
-- Name: activity_id_seq; Type: SEQUENCE; Schema: ProjetWeb; Owner: romainfrezier
--

CREATE SEQUENCE "ProjetWeb".activity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ProjetWeb".activity_id_seq OWNER TO romainfrezier;

--
-- TOC entry 3638 (class 0 OID 0)
-- Dependencies: 218
-- Name: activity_id_seq; Type: SEQUENCE OWNED BY; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER SEQUENCE "ProjetWeb".activity_id_seq OWNED BY "ProjetWeb".activities.id;


--
-- TOC entry 217 (class 1259 OID 16632)
-- Name: stat_values; Type: TABLE; Schema: ProjetWeb; Owner: romainfrezier
--

CREATE TABLE "ProjetWeb".stat_values (
    activity integer NOT NULL,
    value numeric NOT NULL,
    "user" integer NOT NULL,
    stat character varying NOT NULL
);


ALTER TABLE "ProjetWeb".stat_values OWNER TO romainfrezier;

--
-- TOC entry 221 (class 1259 OID 16786)
-- Name: stats; Type: TABLE; Schema: ProjetWeb; Owner: romainfrezier
--

CREATE TABLE "ProjetWeb".stats (
    id integer NOT NULL,
    "statName" character varying(255) NOT NULL,
    "sportId" integer NOT NULL
);


ALTER TABLE "ProjetWeb".stats OWNER TO romainfrezier;

--
-- TOC entry 220 (class 1259 OID 16785)
-- Name: stats_id_seq; Type: SEQUENCE; Schema: ProjetWeb; Owner: romainfrezier
--

CREATE SEQUENCE "ProjetWeb".stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ProjetWeb".stats_id_seq OWNER TO romainfrezier;

--
-- TOC entry 3639 (class 0 OID 0)
-- Dependencies: 220
-- Name: stats_id_seq; Type: SEQUENCE OWNED BY; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER SEQUENCE "ProjetWeb".stats_id_seq OWNED BY "ProjetWeb".stats.id;


--
-- TOC entry 216 (class 1259 OID 16587)
-- Name: users; Type: TABLE; Schema: ProjetWeb; Owner: romainfrezier
--

CREATE TABLE "ProjetWeb".users (
    id integer DEFAULT nextval('"ProjetWeb"."USERS_id_seq"'::regclass) NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    "isPremium" boolean NOT NULL,
    "isAdmin" boolean NOT NULL
);


ALTER TABLE "ProjetWeb".users OWNER TO romainfrezier;

--
-- TOC entry 3466 (class 2604 OID 16760)
-- Name: activities id; Type: DEFAULT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".activities ALTER COLUMN id SET DEFAULT nextval('"ProjetWeb".activity_id_seq'::regclass);


--
-- TOC entry 3464 (class 2604 OID 16541)
-- Name: competitions id; Type: DEFAULT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".competitions ALTER COLUMN id SET DEFAULT nextval('"ProjetWeb"."COMPET_id_seq"'::regclass);


--
-- TOC entry 3463 (class 2604 OID 16522)
-- Name: items id; Type: DEFAULT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".items ALTER COLUMN id SET DEFAULT nextval('"ProjetWeb"."MATERIEL_id_seq"'::regclass);


--
-- TOC entry 3462 (class 2604 OID 16482)
-- Name: sports id; Type: DEFAULT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".sports ALTER COLUMN id SET DEFAULT nextval('"ProjetWeb"."TYPE_SPORT_id_seq"'::regclass);


--
-- TOC entry 3467 (class 2604 OID 16789)
-- Name: stats id; Type: DEFAULT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".stats ALTER COLUMN id SET DEFAULT nextval('"ProjetWeb".stats_id_seq'::regclass);


--
-- TOC entry 3473 (class 2606 OID 16545)
-- Name: competitions COMPET_pkey; Type: CONSTRAINT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".competitions
    ADD CONSTRAINT "COMPET_pkey" PRIMARY KEY (id);


--
-- TOC entry 3471 (class 2606 OID 16526)
-- Name: items MATERIEL_pkey; Type: CONSTRAINT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".items
    ADD CONSTRAINT "MATERIEL_pkey" PRIMARY KEY (id);


--
-- TOC entry 3469 (class 2606 OID 16486)
-- Name: sports TYPE_SPORT_pkey; Type: CONSTRAINT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".sports
    ADD CONSTRAINT "TYPE_SPORT_pkey" PRIMARY KEY (id);


--
-- TOC entry 3475 (class 2606 OID 16594)
-- Name: users USERS_pkey; Type: CONSTRAINT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".users
    ADD CONSTRAINT "USERS_pkey" PRIMARY KEY (id);


--
-- TOC entry 3481 (class 2606 OID 16764)
-- Name: activities activity_pkey; Type: CONSTRAINT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".activities
    ADD CONSTRAINT activity_pkey PRIMARY KEY (id);


--
-- TOC entry 3479 (class 2606 OID 16793)
-- Name: stat_values stat_values_pkey; Type: CONSTRAINT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".stat_values
    ADD CONSTRAINT stat_values_pkey PRIMARY KEY (activity, stat);


--
-- TOC entry 3483 (class 2606 OID 16791)
-- Name: stats stats_pkey; Type: CONSTRAINT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".stats
    ADD CONSTRAINT stats_pkey PRIMARY KEY (id);


--
-- TOC entry 3477 (class 2606 OID 16745)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3486 (class 2606 OID 16546)
-- Name: competitions COMPET_sport_fkey; Type: FK CONSTRAINT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".competitions
    ADD CONSTRAINT "COMPET_sport_fkey" FOREIGN KEY (sport) REFERENCES "ProjetWeb".sports(id);


--
-- TOC entry 3489 (class 2606 OID 16775)
-- Name: activities activities_sport_fkey; Type: FK CONSTRAINT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".activities
    ADD CONSTRAINT activities_sport_fkey FOREIGN KEY ("sportId") REFERENCES "ProjetWeb".sports(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3490 (class 2606 OID 16780)
-- Name: activities activities_user_fkey; Type: FK CONSTRAINT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".activities
    ADD CONSTRAINT activities_user_fkey FOREIGN KEY ("user") REFERENCES "ProjetWeb".users(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3484 (class 2606 OID 16532)
-- Name: items items_sport_fkey; Type: FK CONSTRAINT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".items
    ADD CONSTRAINT items_sport_fkey FOREIGN KEY ("sportId") REFERENCES "ProjetWeb".sports(id) NOT VALID;


--
-- TOC entry 3485 (class 2606 OID 16605)
-- Name: items items_user_fkey; Type: FK CONSTRAINT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".items
    ADD CONSTRAINT items_user_fkey FOREIGN KEY ("user") REFERENCES "ProjetWeb".users(id) NOT VALID;


--
-- TOC entry 3488 (class 2606 OID 16794)
-- Name: stat_values stat_values_activity_fkey; Type: FK CONSTRAINT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".stat_values
    ADD CONSTRAINT stat_values_activity_fkey FOREIGN KEY (activity) REFERENCES "ProjetWeb".activities(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3487 (class 2606 OID 16739)
-- Name: stat_values stat_values_user_fkey; Type: FK CONSTRAINT; Schema: ProjetWeb; Owner: romainfrezier
--

ALTER TABLE ONLY "ProjetWeb".stat_values
    ADD CONSTRAINT stat_values_user_fkey FOREIGN KEY ("user") REFERENCES "ProjetWeb".users(id) NOT VALID;


-- Completed on 2022-03-25 21:23:56 CET

--
-- PostgreSQL database dump complete
--