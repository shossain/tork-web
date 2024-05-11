"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";
import Typewriter from 'typewriter-effect';

export default function ViewTaskLog({ task }: { task: Task }) {
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [contents, setContents] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tail, setTail] = useState(
    task.state === "RUNNING" || task.state === "SCHEDULED"
  );
  const [tailInterval, setTailInterval] = useState(2_000);

  const refreshLog = useCallback(
    function (page: number) {
      console.log(`${format(new Date(), "hh:mm:ss")}: refresh log`);
      return fetch(`/api/tasks/${task.id}/log?page=${page}`)
        .then((res) => res.json() as Promise<Page<TaskLogPart>>)
        .then((log) => {
          setTotalPages(log.totalPages);
          return log.items
            .map((it) => {
              return task.name.includes("created") ? "Sending email to team@pytho.ai" : "Creating SITREP from " + it.contents.split("\n").reverse().join("\n");
            })
            .join("")
            .trim();
        })
        .then((contents) => {
          setContents((oldContents) => {
            if (oldContents === contents) {
              setTailInterval((tailInterval) => {
                var newInterval = tailInterval * 2;
                if (newInterval > 10_000) {
                  newInterval = 10_000;
                }
                return newInterval;
              });
            } else {
              setTailInterval(2_000);
            }
            return contents;
          });
        });
    },
    [open, task.id, contents, setContents, setTotalPages, setTailInterval]
  );

  useEffect(() => {
    if (tail && open) {
      const intervalID = setInterval(() => {
        refreshLog(1);
      }, tailInterval);
      return () => clearInterval(intervalID);
    }
  }, [open, tail, tailInterval]);

  return (
    <>
      <button
        type="button"
        className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 hover:bg-gray-50"
        onClick={() => {
          refreshLog(page);
          setOpen(true);
        }}
      >
        Create SPOTREP
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => {
            setContents("");
            setOpen(false);
            setTail(false);
          }}
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
                <Dialog.Panel className="rounded-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6 sm:w-full sm:max-w-4xl" style={{backgroundColor: '#333'}}>
                  <div style={{height: 350}}> 
                    <p className="whitespace-pre-line max-h-96 overflow-scroll text-xs">
                      <Typewriter options={{ delay: 15 }}
                        onInit={(typewriter) => { 
                          typewriter.typeString(`<b>SPOTREP</b>
                            LINE 1 — DATE AND TIME: 101345Z MAY 24
                            LINE 2 — UNIT: Task Force Alpha
                            LINE 3 — SIZE: 1 enemy tank
                            LINE 4 — ACTIVITY: Traveling westward
                            LINE 5 — LOCATION: 34T EN 5678 6789 (Eastern Desert Region)
                            LINE 6 — UNIT: Russian T-90 Main Battle Tank
                            LINE 7 — TIME: 101330Z MAY 24
                            LINE 8 — EQUIPMENT:
                            &nbsp;&nbsp;- Armament: 125mm smoothbore gun, 7.62mm machine gun, 12.7mm anti-aircraft machine gun
                            &nbsp;&nbsp;- Armor: Composite armor with ERA (Explosive Reactive Armor)
                            &nbsp;&nbsp;- Speed: Up to 60 km/h off-road
                            &nbsp;&nbsp;- Crew: 3 (Commander, Gunner, Driver)
                            LINE 9 — SENDER’S ASSESSMENT:
                            &nbsp;&nbsp;- Presence of Russian T-90 tank in Eastern Desert poses significant threat. Recommend continued surveillance and strategic response.</li>
                            LINE 10 — NARRATIVE:
                            At 101330Z MAY 24, Task Force Alpha detected 1 Russian T-90 Main Battle Tank traveling westward in the Eastern Desert region at coordinates 34.5678° N, 45.6789° E. Tank observed moving at approximately 45 km/h, no immediate signs of engagement. Recommend alerting nearby units and formulating appropriate response.
                            LINE 11 — AUTHENTICATION:
                            &nbsp;&nbsp;- Task Force Alpha Commander, Lt. Col. Smith</li>
                    
                          `) 
                          .callFunction(() => { 
                            console.log('String typed out!'); 
                          }) 
                  
                          .start(); 
                        }} 
                      />
                    </p>
                  </div>
                  

                  <div className="flex gap-1 mt-4 justify-between">
                    <button
                      type="button"
                      className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      onClick={() => {
                        setContents("");
                        setOpen(false);
                        setTail(false);
                      }}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                    <div className="flex gap-2">
                      {task.state === "RUNNING" ||
                      task.state === "SCHEDULED" ? (
                        <button
                          type="button"
                          title="Tail"
                          className={`rounded-md font-semibold bg-white px-3 py-2 text-sm  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
                          onClick={() => {
                            if (!tail) {
                              refreshLog(1);
                              setPage(1);
                            }
                            setTail((v) => !v);
                          }}
                        >
                          <ArrowPathIcon
                            className={`h-5 w-5 text-black ${
                              tail ? "animate-spin" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      ) : (
                        <></>
                      )}
                      {/* <button
                        type="button"
                        disabled={page >= totalPages || tail}
                        title="Previous Page"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-30"
                        onClick={() => {
                          setPage((page) => page + 1);
                          refreshLog(page + 1);
                        }}
                      >
                        <ArrowLeftIcon
                          className="h-5 w-5 text-black"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        type="button"
                        title="Next Page"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-30"
                        disabled={page < 2 || tail}
                        onClick={() => {
                          setPage((page) => page - 1);
                          refreshLog(page - 1);
                        }}
                      >
                        <ArrowRightIcon
                          className="h-5 w-5 text-black"
                          aria-hidden="true"
                        />
                      </button> */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
