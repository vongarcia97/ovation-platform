/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { formatInput } from '~/utils/helpers';
import type { Supplier } from '@prisma/client';
import { api } from '~/utils/api';



export const PublicSupplierDatabaseTable: React.FC<Supplier[]> = ({suppliers}) => {

  // const { data, isLoading } = api.supplier.getSupplierContacts.useQuery(undefined, { staleTime: 360 * (60 * 1000)  }); // 360 mins -> 4 hrs

  const [filter, setFilter] = useState<string>('supplier');
  const [search, setSearch] = useState<string>('');
  const [enhancedCommissionData, setEnhancedCommissionData] = useState<PublicSupplierDatabaseProps[]>([]);

  useEffect(() => {
    // set enhancedCommissionData to props
    setEnhancedCommissionData(props);

    // if search is not empty, filter enhancedCommissionData by search
    // search !== '' && setEnhancedCommissionData((currentData) => filter === 'supplier' ? filterEnhancedCommissionsDataByName(props, formatInput(search)) : filterEnhancedCommissionsDataByLocation(props, formatInput(search)));

  }, [filter, search, props])

  return (
    <div className="p-5">
      {/* Search box and filter dropdown */}
      <div className="input-group mb-5">
        <select className="select select-bordered" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="supplier">Supplier</option>
          <option value="location">Location</option>
        </select>
        <input type="text" placeholder="Search…" className="input input-bordered" value={search} onChange={(e) => setSearch(e.target.value)}/>
        <div className="btn" onClick={() => setSearch('')}>
          RESET
        </div>
      </div>

      {/* TABLE CONTAINING DATA */}

      <div>
        <table className="table-fixed">
          <thead>
            <tr>
              <th className="bg-teal-400 text-xl">Location</th>
              <th className="bg-teal-400 text-xl">Supplier</th> 
              <th className="bg-teal-400 text-xl">Contact</th> 
              <th className="bg-teal-400 text-xl">Rep. Company</th>
              <th className="bg-teal-400 text-xl">GM</th>
              <th className="bg-teal-400 text-xl"></th>
            </tr>
          </thead> 
          <tbody>
            {enhancedCommissionData.map((row, i) => (
              <tr className="text-black text-md text-center" key={i}>
                <td className={i % 2 ? "bg-stone-300 p-2" : "bg-stone-100 p-2"}>
                  {row.city}, {row.state}<br/>
                  {row.country}<br/>
                </td>
                <td className={i % 2 ? "bg-stone-300 p-2" : "bg-stone-100 p-2"}>{row.name}</td>
                <td className={i % 2 ? "bg-stone-300 p-2" : "bg-stone-100 p-2"}>CONTACT COMPONENT</td>
                <td className={i % 2 ? "bg-stone-300" : "bg-stone-100"}>CONTACT COMPONENT</td>
                <td className={i % 2 ? "bg-stone-300" : "bg-stone-100"}>CONTACT COMPONENT</td>
                <td className={i % 2 ? "bg-stone-300" : "bg-stone-100"}>FLAG POPUP</td>
              </tr>
            ))}
          </tbody> 
          <tfoot>
            <tr>
              <th className="bg-teal-400 text-xl">Location</th>
              <th className="bg-teal-400 text-xl">Supplier</th> 
              <th className="bg-teal-400 text-xl">Contact</th> 
              <th className="bg-teal-400 text-xl">Rep. Company</th>
              <th className="bg-teal-400 text-xl">GM</th>
              <th className="bg-teal-400 text-xl"></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

/* COMPONENT FOR RENDERING CONTACT INFO */

/* const ContactInfo = () => {

} */
