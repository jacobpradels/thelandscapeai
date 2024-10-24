import { Coins } from "lucide-react";
import config from "@/config";
import { Check, X } from "lucide-react";

const BuyCreditsModal = () => {
  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4" />
              Out of credits
            </div>
            <X
              className="w-4 h-4 cursor-pointer rounded-full"
              onClick={() => (document.getElementById("my_modal_1") as HTMLDialogElement).close()}
            />
          </h3>
          <div className="py-4 h-full flex justify-center">
            <div className="flex flex-col sm:flex-row h-84 gap-2 justify-center w-full">
              <div className="flex flex-col h-full w-full bg-black/40 rounded-md p-4 justify-between items-center">
                <div className="text-xl font-bold w-full text-left">
                  {config.stripe.plans[0].name}
                </div>
                <div className="text-3xl font-bold flex items-start gap-2 w-full">
                  <span className="text-xl line-through text-gray-400">${config.stripe.plans[0].priceAnchor}</span>
                  <span>
                    ${config.stripe.plans[0].price}
                  </span>
                </div>
                <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                  {config.stripe.plans[0].features.map((feature) => (
                    <li key={feature.name} className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      {feature.name}
                    </li>
                  ))}
                </ul>
                <div className="w-full h-12 flex items-center justify-center btn btn-primary mt-4">
                  50 Credits
                </div>
              </div>
              <div className="flex flex-col h-full w-full bg-black/40 rounded-md p-4 justify-between items-center">
                <div className="text-xl font-bold w-full text-left">
                  {config.stripe.plans[1].name}
                </div>
                <div className="text-3xl font-bold flex items-start gap-2 w-full">
                  <span className="text-xl line-through text-gray-400">${config.stripe.plans[1].priceAnchor}</span>
                  <span>
                    ${config.stripe.plans[1].price}
                  </span>
                </div>
                <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                  {config.stripe.plans[1].features.map((feature) => (
                    <li key={feature.name} className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      {feature.name}
                    </li>
                  ))}
                </ul>
                <div
                  className="w-full h-12 flex items-center justify-center btn btn-primary mt-4 animated-gradient-background"
                >
                  250 Credits
                </div>
              </div>
            </div>
          </div>
          {/* <div
            className="w-full text-center btn"
            onClick={() => {
              (document.getElementById("my_modal_1") as HTMLDialogElement).close();
            }}
          >
            Close
          </div> */}
        </div>
      </dialog>
    </>
  )
}

export default BuyCreditsModal;