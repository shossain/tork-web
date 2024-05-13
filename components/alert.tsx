import { EnvelopeIcon } from "@heroicons/react/24/solid";


export default function Alert({ message }: { message: string }) {
  return message ? (
    <div className="rounded-md bg-red-50 ml-5">
      <div className="flex">
        <div className="flex-shrink-0">
          <EnvelopeIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-gray-500">{message}</h3>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
