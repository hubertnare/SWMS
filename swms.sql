--
-- PostgreSQL database dump
--

-- Dumped from database version 11.1
-- Dumped by pg_dump version 11.1

-- Started on 2019-10-26 15:01:00

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE swms;
--
-- TOC entry 4382 (class 1262 OID 219317)
-- Name: swms; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE swms WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';


ALTER DATABASE swms OWNER TO postgres;

\connect swms

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 219329)
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- TOC entry 4383 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 221 (class 1259 OID 220976)
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    emp_id integer NOT NULL,
    name character varying(255),
    surname character varying(255),
    role integer,
    username character varying(255),
    password character varying(255)
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 220974)
-- Name: employees_emp_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employees_emp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employees_emp_id_seq OWNER TO postgres;

--
-- TOC entry 4384 (class 0 OID 0)
-- Dependencies: 220
-- Name: employees_emp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_emp_id_seq OWNED BY public.employees.emp_id;


--
-- TOC entry 223 (class 1259 OID 220988)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role character varying(255),
    description character varying(255)
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 220986)
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_role_id_seq OWNER TO postgres;

--
-- TOC entry 4385 (class 0 OID 0)
-- Dependencies: 222
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- TOC entry 217 (class 1259 OID 220948)
-- Name: routes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.routes (
    route_id integer NOT NULL,
    name character varying(255) NOT NULL,
    length double precision NOT NULL,
    geom public.geometry(LineString,4326)
);


ALTER TABLE public.routes OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 220946)
-- Name: routes_route_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.routes_route_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.routes_route_id_seq OWNER TO postgres;

--
-- TOC entry 4386 (class 0 OID 0)
-- Dependencies: 216
-- Name: routes_route_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.routes_route_id_seq OWNED BY public.routes.route_id;


--
-- TOC entry 227 (class 1259 OID 221026)
-- Name: timecard; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.timecard (
    timecard_id integer NOT NULL,
    date date,
    start_time time(2) with time zone,
    end_time time(2) with time zone,
    job_description character varying(255),
    emp_id integer,
    zone integer,
    supervisor integer
);


ALTER TABLE public.timecard OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 221024)
-- Name: timecard_timecard_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.timecard_timecard_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.timecard_timecard_id_seq OWNER TO postgres;

--
-- TOC entry 4387 (class 0 OID 0)
-- Dependencies: 226
-- Name: timecard_timecard_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.timecard_timecard_id_seq OWNED BY public.timecard.timecard_id;


--
-- TOC entry 229 (class 1259 OID 221039)
-- Name: vehicle_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicle_log (
    log_id integer NOT NULL,
    vehicle integer,
    distance double precision,
    driver integer,
    fuel double precision
);


ALTER TABLE public.vehicle_log OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 221037)
-- Name: vehicle_log_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vehicle_log_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vehicle_log_log_id_seq OWNER TO postgres;

--
-- TOC entry 4388 (class 0 OID 0)
-- Dependencies: 228
-- Name: vehicle_log_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vehicle_log_log_id_seq OWNED BY public.vehicle_log.log_id;


--
-- TOC entry 225 (class 1259 OID 221015)
-- Name: vehicles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicles (
    vehicle_id integer NOT NULL,
    name character varying(255),
    type character varying(255),
    capacity double precision,
    use character varying(255)
);


ALTER TABLE public.vehicles OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 221013)
-- Name: vehicles_vehicle_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vehicles_vehicle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vehicles_vehicle_id_seq OWNER TO postgres;

--
-- TOC entry 4389 (class 0 OID 0)
-- Dependencies: 224
-- Name: vehicles_vehicle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vehicles_vehicle_id_seq OWNED BY public.vehicles.vehicle_id;


--
-- TOC entry 219 (class 1259 OID 220960)
-- Name: waste; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.waste (
    waste_id integer NOT NULL,
    waste_type character varying(255),
    waste_source character varying(255)
);


ALTER TABLE public.waste OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 220958)
-- Name: waste_waste_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.waste_waste_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.waste_waste_id_seq OWNER TO postgres;

--
-- TOC entry 4390 (class 0 OID 0)
-- Dependencies: 218
-- Name: waste_waste_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.waste_waste_id_seq OWNED BY public.waste.waste_id;


--
-- TOC entry 215 (class 1259 OID 220934)
-- Name: wastebins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wastebins (
    bin_id integer NOT NULL,
    type character varying(255) NOT NULL,
    volume double precision NOT NULL,
    wastetype integer NOT NULL,
    geom public.geometry(Point,4326)
);


ALTER TABLE public.wastebins OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 220932)
-- Name: wastebins_bin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.wastebins_bin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.wastebins_bin_id_seq OWNER TO postgres;

--
-- TOC entry 4391 (class 0 OID 0)
-- Dependencies: 214
-- Name: wastebins_bin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.wastebins_bin_id_seq OWNED BY public.wastebins.bin_id;


--
-- TOC entry 213 (class 1259 OID 220920)
-- Name: zones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zones (
    zone_id integer NOT NULL,
    name character varying(255) NOT NULL,
    area double precision,
    percentage_waste_composition double precision,
    description character varying(255),
    geom public.geometry(Polygon,4326)
);


ALTER TABLE public.zones OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 220918)
-- Name: zones_zone_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.zones_zone_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.zones_zone_id_seq OWNER TO postgres;

--
-- TOC entry 4392 (class 0 OID 0)
-- Dependencies: 212
-- Name: zones_zone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.zones_zone_id_seq OWNED BY public.zones.zone_id;


--
-- TOC entry 4198 (class 2604 OID 220979)
-- Name: employees emp_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees ALTER COLUMN emp_id SET DEFAULT nextval('public.employees_emp_id_seq'::regclass);


--
-- TOC entry 4199 (class 2604 OID 220991)
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- TOC entry 4196 (class 2604 OID 220951)
-- Name: routes route_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes ALTER COLUMN route_id SET DEFAULT nextval('public.routes_route_id_seq'::regclass);


--
-- TOC entry 4201 (class 2604 OID 221029)
-- Name: timecard timecard_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timecard ALTER COLUMN timecard_id SET DEFAULT nextval('public.timecard_timecard_id_seq'::regclass);


--
-- TOC entry 4202 (class 2604 OID 221042)
-- Name: vehicle_log log_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_log ALTER COLUMN log_id SET DEFAULT nextval('public.vehicle_log_log_id_seq'::regclass);


--
-- TOC entry 4200 (class 2604 OID 221018)
-- Name: vehicles vehicle_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles ALTER COLUMN vehicle_id SET DEFAULT nextval('public.vehicles_vehicle_id_seq'::regclass);


--
-- TOC entry 4197 (class 2604 OID 220963)
-- Name: waste waste_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.waste ALTER COLUMN waste_id SET DEFAULT nextval('public.waste_waste_id_seq'::regclass);


--
-- TOC entry 4195 (class 2604 OID 220937)
-- Name: wastebins bin_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wastebins ALTER COLUMN bin_id SET DEFAULT nextval('public.wastebins_bin_id_seq'::regclass);


--
-- TOC entry 4194 (class 2604 OID 220923)
-- Name: zones zone_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zones ALTER COLUMN zone_id SET DEFAULT nextval('public.zones_zone_id_seq'::regclass);


--
-- TOC entry 4368 (class 0 OID 220976)
-- Dependencies: 221
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.employees (emp_id, name, surname, role, username, password) VALUES (2, 'peter', 'Doe', 3, 'peterdoe', '12345');
INSERT INTO public.employees (emp_id, name, surname, role, username, password) VALUES (3, 'James', 'Doe', 4, 'driver', '12345');
INSERT INTO public.employees (emp_id, name, surname, role, username, password) VALUES (4, 'jane', 'Doe', 8, 'supervisor', '12345');
INSERT INTO public.employees (emp_id, name, surname, role, username, password) VALUES (1, 'tony', 'stark', 1, 'superadmin', 'superadmin');


--
-- TOC entry 4370 (class 0 OID 220988)
-- Dependencies: 223
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roles (role_id, role, description) VALUES (1, 'superadmin', 'administrator with all system rights');
INSERT INTO public.roles (role_id, role, description) VALUES (3, 'cleaner', NULL);
INSERT INTO public.roles (role_id, role, description) VALUES (4, 'driver', NULL);
INSERT INTO public.roles (role_id, role, description) VALUES (8, 'supervisor', NULL);


--
-- TOC entry 4364 (class 0 OID 220948)
-- Dependencies: 217
-- Data for Name: routes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4192 (class 0 OID 219638)
-- Dependencies: 198
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4374 (class 0 OID 221026)
-- Dependencies: 227
-- Data for Name: timecard; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.timecard (timecard_id, date, start_time, end_time, job_description, emp_id, zone, supervisor) VALUES (1, NULL, '23:57:00-07', '07:57:00-07', 'Dummy Job', 3, 1, 4);
INSERT INTO public.timecard (timecard_id, date, start_time, end_time, job_description, emp_id, zone, supervisor) VALUES (2, NULL, '08:00:00-07', NULL, 'testing 1234', 3, 1, 4);


--
-- TOC entry 4376 (class 0 OID 221039)
-- Dependencies: 229
-- Data for Name: vehicle_log; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4372 (class 0 OID 221015)
-- Dependencies: 225
-- Data for Name: vehicles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.vehicles (vehicle_id, name, type, capacity, use) VALUES (1, 'Nissan', 'UD 70', 7, 'Waste Collection');


--
-- TOC entry 4366 (class 0 OID 220960)
-- Dependencies: 219
-- Data for Name: waste; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.waste (waste_id, waste_type, waste_source) VALUES (1, 'Organic', 'fruit, vegetables, meat');
INSERT INTO public.waste (waste_id, waste_type, waste_source) VALUES (2, 'Recyclable', 'hardware, stationary');


--
-- TOC entry 4362 (class 0 OID 220934)
-- Dependencies: 215
-- Data for Name: wastebins; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.wastebins (bin_id, type, volume, wastetype, geom) VALUES (1, 'plastic', 10, 1, '0101000020E6100000B2814E233AD63D403D88D2A9378433C0');
INSERT INTO public.wastebins (bin_id, type, volume, wastetype, geom) VALUES (2, 'metal', 5, 2, '0101000020E6100000121111513ED73D40E15159735B8433C0');


--
-- TOC entry 4360 (class 0 OID 220920)
-- Dependencies: 213
-- Data for Name: zones; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.zones (zone_id, name, area, percentage_waste_composition, description, geom) VALUES (1, 'Dummy', 20, 35, 'Dummy Zone', '0103000020E61000000100000006000000E5C0333701D73D401532AD885B8433C02CB43A8248D73D40A5986538248433C08AD98B3287D73D4086CBF4D8928433C05F9476D734D73D40D7F8F673D68433C0EEFA2E87FDD63D4046F3696EAB8433C0E5C0333701D73D401532AD885B8433C0');


--
-- TOC entry 4393 (class 0 OID 0)
-- Dependencies: 220
-- Name: employees_emp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_emp_id_seq', 4, true);


--
-- TOC entry 4394 (class 0 OID 0)
-- Dependencies: 222
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 8, true);


--
-- TOC entry 4395 (class 0 OID 0)
-- Dependencies: 216
-- Name: routes_route_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.routes_route_id_seq', 1, false);


--
-- TOC entry 4396 (class 0 OID 0)
-- Dependencies: 226
-- Name: timecard_timecard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.timecard_timecard_id_seq', 2, true);


--
-- TOC entry 4397 (class 0 OID 0)
-- Dependencies: 228
-- Name: vehicle_log_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vehicle_log_log_id_seq', 1, false);


--
-- TOC entry 4398 (class 0 OID 0)
-- Dependencies: 224
-- Name: vehicles_vehicle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vehicles_vehicle_id_seq', 1, true);


--
-- TOC entry 4399 (class 0 OID 0)
-- Dependencies: 218
-- Name: waste_waste_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.waste_waste_id_seq', 2, true);


--
-- TOC entry 4400 (class 0 OID 0)
-- Dependencies: 214
-- Name: wastebins_bin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.wastebins_bin_id_seq', 2, true);


--
-- TOC entry 4401 (class 0 OID 0)
-- Dependencies: 212
-- Name: zones_zone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.zones_zone_id_seq', 1, true);


--
-- TOC entry 4217 (class 2606 OID 220984)
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (emp_id);


--
-- TOC entry 4219 (class 2606 OID 220996)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- TOC entry 4212 (class 2606 OID 220953)
-- Name: routes routes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_pkey PRIMARY KEY (route_id);


--
-- TOC entry 4223 (class 2606 OID 221031)
-- Name: timecard timecard_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timecard
    ADD CONSTRAINT timecard_pkey PRIMARY KEY (timecard_id);


--
-- TOC entry 4221 (class 2606 OID 221023)
-- Name: vehicles vehicles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_pkey PRIMARY KEY (vehicle_id);


--
-- TOC entry 4215 (class 2606 OID 220968)
-- Name: waste waste_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.waste
    ADD CONSTRAINT waste_pkey PRIMARY KEY (waste_id);


--
-- TOC entry 4210 (class 2606 OID 220939)
-- Name: wastebins wastebins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wastebins
    ADD CONSTRAINT wastebins_pkey PRIMARY KEY (bin_id);


--
-- TOC entry 4207 (class 2606 OID 220928)
-- Name: zones zones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zones
    ADD CONSTRAINT zones_pkey PRIMARY KEY (zone_id);


--
-- TOC entry 4213 (class 1259 OID 220957)
-- Name: sidx_routes_geom; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sidx_routes_geom ON public.routes USING gist (geom);


--
-- TOC entry 4208 (class 1259 OID 220943)
-- Name: sidx_wastebins_geom; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sidx_wastebins_geom ON public.wastebins USING gist (geom);


--
-- TOC entry 4205 (class 1259 OID 220929)
-- Name: sidx_zones_geom; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sidx_zones_geom ON public.zones USING gist (geom);


--
-- TOC entry 4225 (class 2606 OID 220997)
-- Name: employees employees_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_role_fkey FOREIGN KEY (role) REFERENCES public.roles(role_id);


--
-- TOC entry 4226 (class 2606 OID 221032)
-- Name: timecard timecard_emp_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timecard
    ADD CONSTRAINT timecard_emp_id_fkey FOREIGN KEY (emp_id) REFERENCES public.employees(emp_id);


--
-- TOC entry 4228 (class 2606 OID 227514)
-- Name: timecard timecard_supervisor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timecard
    ADD CONSTRAINT timecard_supervisor_fkey FOREIGN KEY (supervisor) REFERENCES public.employees(emp_id);


--
-- TOC entry 4227 (class 2606 OID 227509)
-- Name: timecard timecard_zone_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timecard
    ADD CONSTRAINT timecard_zone_fkey FOREIGN KEY (zone) REFERENCES public.zones(zone_id);


--
-- TOC entry 4230 (class 2606 OID 221048)
-- Name: vehicle_log vehicle_log_driver_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_log
    ADD CONSTRAINT vehicle_log_driver_fkey FOREIGN KEY (driver) REFERENCES public.employees(emp_id);


--
-- TOC entry 4229 (class 2606 OID 221043)
-- Name: vehicle_log vehicle_log_vehicle_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_log
    ADD CONSTRAINT vehicle_log_vehicle_fkey FOREIGN KEY (vehicle) REFERENCES public.vehicles(vehicle_id);


--
-- TOC entry 4224 (class 2606 OID 220969)
-- Name: wastebins wastebins_wastetype_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wastebins
    ADD CONSTRAINT wastebins_wastetype_fkey FOREIGN KEY (wastetype) REFERENCES public.waste(waste_id);


-- Completed on 2019-10-26 15:01:09

--
-- PostgreSQL database dump complete
--

