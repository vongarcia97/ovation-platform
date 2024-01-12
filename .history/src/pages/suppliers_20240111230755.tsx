import Head from "next/head";
import { api } from "~/utils/api"
import { supplierDatabaseData, duplicateIDs } from "~/utils/data-migration";
import type { SupplierType } from "@prisma/client";
import { useState } from "react";

export default function Suppliers() {

  const [supplierID, setSupplierID] = useState<number>(0)

  /* Here we will write the functions to migrate current existing into the new Supabase database
    * 1. Create a function to use api to create a new supplier
    * 2. Create a function to use api to connect an onsite contact to a supplier
    * 3. Create a function to use api to create a new onsite contact
    * 4. Create a function to use api to create a new rep company contact
  */



  const createSupplierAPI = api.supplier.addSupplier.useMutation({
    onSuccess: (supplier) => {
      console.log("Supplier created", supplier)  
      
      setSupplierID((oldID) => supplier.id)
    }
  })

  const createOnsiteContactAPI = api.supplier.addOnSiteContact.useMutation({
    onSuccess: (contact) => {
      console.log("Onsite contact created", contact)
    }
  })

  const createRepContactAPI = api.supplier.addRepresentativeCompany.useMutation({
    onSuccess: (contact) => {
      console.log("Rep contact created", contact)
    }
  })

  const createGMContactAPI = api.supplier.addGeneralManager.useMutation({
    onSuccess: (contact) => {
      console.log("GM contact created", contact)
    }
  })

  const supplierTypes =  [
    "Hotel",
    "Hotel ",
    "DMC",
    "Tour Operator",
    "Air",
    "Cruise",
    "Representation Company",
    "Car Rental",
    "Insurance",
    "Chauffeur Services",
    "Chauffered",
    "Chauffered ",
    "Trains",
    "Rails",
    null,
  ];

  // function that will generate the Supplier ENUM for type
  function generateSupplierTypeENUM(type: string | null) {
    switch (type) {
      case "Hotel" || "Hotel ":
        return "HOTEL"
      case "DMC":
        return "DMC"
      case "Tour Operator":
        return "TOUR_OPERATOR"
      case "Air":
        return "AIR"
      case "Cruise":
        return "CRUISE"
      case "Representation Company":
        return "REPRESENTATION_COMPANY"
      case "Car Rental":
        return "CAR_RENTAL"
      case "Insurance":
        return "INSURANCE"
      case "Chauffeur Services" || "Chauffered" || "Chauffered ":
        return "CHAUFFEUR_SERVICES"
      case "Trains" || "Rails":
        return "RAIL"
      case null:
        return "OTHER"
      default:
        return "OTHER"
    }
  }

  async function migrateSuppliers() {
    const suppliers = supplierDatabaseData

    suppliers.forEach((supplier) => {
      // create the supplierData object
      const supplierData = {
        name: supplier.supplier_name!,
        type: generateSupplierTypeENUM(supplier.supplier_type) as SupplierType,
        region: null,
        country: supplier.country,
        city: supplier.city,
        state: supplier.state,
        ovationID: supplier.id,
      }
      // Try to create the supplier
      try {
        const supplierCreated = createSupplierAPI.mutate(supplierData)
      } catch (error) {
        console.log(error)
      }

      /*   "hotel_representative": {
            "title": null,
            "email": "s.baratelli@edenroccapcana.com ",
            "name": " Baratelli, Stefano ",
            "phone": "+1 809 469-7469"
        },  */
      // Create the onsite contact if it exists on the data
      if (supplier.hotel_representative !== null) {
        try {
          const onSiteContactData = {
            name: supplier.hotel_representative.name,
            email: supplier.hotel_representative.email,
            phone: supplier.hotel_representative.phone,
            title: supplier.hotel_representative.title,
            supplierId: supplierID,
          }

          const onSiteContactCreated = createOnsiteContactAPI.mutate(onSiteContactData)
        } catch (error) {
          console.log(error)
        }
      }
      

    })
  }


  return (
    <>
      <Head>
        <title>OvationNetwork - Suppliers</title>
        <meta name="description" content="Listed contacts for ON suppliers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#5f5f5f]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-[hsl(195,100%,71%)] sm:text-[5rem]">
            OvationNetwork<span className="text-[hsl(195,100%,71%)]">IA</span>Admin Portal
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            {/* CONTENT FOR LINKS TO THE PUBLIC LINK FOR OVATION PAGES */}
          </div>
        </div>
      </main>
    </>
  );
}