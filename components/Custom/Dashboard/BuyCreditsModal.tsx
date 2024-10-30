import { Coins } from "lucide-react";
import config from "@/config";
import { Check, X } from "lucide-react";
import ButtonCheckout from "@/components/ButtonCheckout";

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
                <div className="my-2 w-full">
                  <ButtonCheckout
                    priceId={config.stripe.plans[0].priceId}
                    isFeatured={config.stripe.plans[0].isFeatured}
                    init={false}
                  />
                </div>
              </div>
              <div className="flex flex-col h-full w-full bg-neutral-900 rounded-md p-4 justify-between items-center relative">
                  <div className="absolute -z-10 h-[102%] w-[102%] animated-gradient-background -top-[1%] rounded-md">
                  </div>
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
                <div className="my-2 w-full">
                  <ButtonCheckout
                    priceId={config.stripe.plans[1].priceId}
                    isFeatured={config.stripe.plans[1].isFeatured}
                    init={false}
                  />
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