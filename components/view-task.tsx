"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { stringify } from "yaml";

export default function ViewTask({ task }: { task: Task }) {
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 hover:bg-gray-50"
        onClick={() => setOpen(true)}
      >
        View
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500/30 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6 sm:w-full sm:max-w-4xl">
                  <p className="grid-container bg-gray-200 p-4 whitespace-pre overflow-scroll">                  
                    <div className="grid-item">
                      <video  autoPlay loop className='w-full h-full'>              
                        <source src="http://localhost:3000/550e8400.mp4" type="video/mp4"/>
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="grid-item text-xs">
                      Date Time Group: 2024-05-10 13:45 (UTC)
                      <br />
                      Location: Eastern Desert Region, Coordinates: 34.5678° N, 45.6789° E
                      <br />
                      UAV Details:
                      <ul className={"list-disc list-inside"}>
                        <li>UAV Type: Raven-23 Surveillance Drone                      
                        </li><li>Operator: Task Force Alpha
                        </li><li>Altitude: 15,000 feet
                        </li><li>Speed: 120 km/h
                        </li>
                      </ul>
                      Update:
                      <br />
                      At 13:30 (UTC), Raven-23 Surveillance Drone, operated by Task Force Alpha, detected enemy movement in the Eastern Desert region. The UAV recorded the presence of a Russian-made T-90 Main Battle Tank traveling westward at coordinates 34.5678° N, 45.6789° E.
                      <br />
                      Tank Description:
                      <ul className={"list-disc list-inside"}>
                        <li>Type: T-90 Main Battle Tank
                        </li><li>Country of Origin: Russia
                        </li><li>Armament: 125mm smoothbore gun, 7.62mm machine gun, 12.7mm anti-aircraft machine gun
                        </li><li>Armor: Composite armor with ERA (Explosive Reactive Armor)
                        </li><li>Speed: Up to 60 km/h off-road
                        </li><li>Crew: 3 (Commander, Gunner, Driver)
                        </li>
                      </ul>
                      Observations:
                      <ul className={"list-disc list-inside"}>
                        <li>The T-90 tank was observed traveling at a speed of approximately 45 km/h, maintaining a western trajectory.
                        </li><li>The tank appeared to be in a standard formation, indicating potential support vehicles or infantry units.
                        </li><li>No immediate signs of engagement or hostile activity were observed.
                        </li>
                      </ul>
                    </div>
                  </p>
                  <div className="grid-container">
                    
                  </div>

                  <button
                    type="button"
                    className="mt-4 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
