
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

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE SCHEMA IF NOT EXISTS "supabase_migrations";

ALTER SCHEMA "supabase_migrations" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."group" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "description" text DEFAULT ''::text,
    "name" text NOT NULL,
    "type" text DEFAULT '一般'::text NOT NULL
);

ALTER TABLE "public"."group" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."group_bill" (
    "payee_id" uuid NOT NULL,
    "payer_id" uuid NOT NULL,
    "amount" double precision DEFAULT '0'::double precision NOT NULL
);

ALTER TABLE "public"."group_bill" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."group_has_user" (
    "group_id" uuid NOT NULL,
    "is_owner" boolean DEFAULT false NOT NULL,
    "username" text DEFAULT ''::text NOT NULL,
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "balance" double precision DEFAULT '0'::double precision NOT NULL
);

ALTER TABLE "public"."group_has_user" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profile" (
    "id" uuid NOT NULL,
    "username" character varying NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "picture_url" character varying,
    "email" text NOT NULL
);

ALTER TABLE "public"."profile" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."user_connects_group" (
    "group_has_user_id" uuid NOT NULL,
    "user_id" uuid NOT NULL,
    "group_id" uuid NOT NULL
);

ALTER TABLE "public"."user_connects_group" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "supabase_migrations"."schema_migrations" (
    "version" text NOT NULL,
    "statements" text[],
    "name" text
);

ALTER TABLE "supabase_migrations"."schema_migrations" OWNER TO "postgres";

ALTER TABLE ONLY "public"."group_bill"
    ADD CONSTRAINT "group_bill_pkey" PRIMARY KEY ("payee_id", "payer_id");

ALTER TABLE ONLY "public"."group_has_user"
    ADD CONSTRAINT "group_has_user_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."group"
    ADD CONSTRAINT "group_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "profile_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."user_connects_group"
    ADD CONSTRAINT "user_connects_group_pkey" PRIMARY KEY ("group_has_user_id", "user_id");

ALTER TABLE ONLY "supabase_migrations"."schema_migrations"
    ADD CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version");

ALTER TABLE ONLY "public"."group_bill"
    ADD CONSTRAINT "group_bill_payee_id_fkey" FOREIGN KEY (payee_id) REFERENCES public.group_has_user(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."group_bill"
    ADD CONSTRAINT "group_bill_payer_id_fkey" FOREIGN KEY (payer_id) REFERENCES public.group_has_user(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."group_has_user"
    ADD CONSTRAINT "group_has_user_group_id_fkey" FOREIGN KEY (group_id) REFERENCES public."group"(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "profile_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."user_connects_group"
    ADD CONSTRAINT "user_connects_group_group_has_user_id_fkey" FOREIGN KEY (group_has_user_id) REFERENCES public.group_has_user(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."user_connects_group"
    ADD CONSTRAINT "user_connects_group_group_id_fkey" FOREIGN KEY (group_id) REFERENCES public."group"(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."user_connects_group"
    ADD CONSTRAINT "user_connects_group_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profile(id) ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "Enable ALL for users based on user id" ON "public"."profile" USING ((auth.uid() = id));

CREATE POLICY "Enable read access for all users" ON "public"."group" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."group_bill" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."group_has_user" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."user_connects_group" USING (true);

ALTER TABLE "public"."group" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."group_bill" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."group_has_user" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profile" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."user_connects_group" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."group" TO "anon";
GRANT ALL ON TABLE "public"."group" TO "authenticated";
GRANT ALL ON TABLE "public"."group" TO "service_role";

GRANT ALL ON TABLE "public"."group_bill" TO "anon";
GRANT ALL ON TABLE "public"."group_bill" TO "authenticated";
GRANT ALL ON TABLE "public"."group_bill" TO "service_role";

GRANT ALL ON TABLE "public"."group_has_user" TO "anon";
GRANT ALL ON TABLE "public"."group_has_user" TO "authenticated";
GRANT ALL ON TABLE "public"."group_has_user" TO "service_role";

GRANT ALL ON TABLE "public"."profile" TO "anon";
GRANT ALL ON TABLE "public"."profile" TO "authenticated";
GRANT ALL ON TABLE "public"."profile" TO "service_role";

GRANT ALL ON TABLE "public"."user_connects_group" TO "anon";
GRANT ALL ON TABLE "public"."user_connects_group" TO "authenticated";
GRANT ALL ON TABLE "public"."user_connects_group" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
