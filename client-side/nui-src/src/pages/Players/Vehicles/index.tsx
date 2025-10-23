import { Header } from "./_components/Header";
import { VehicleList } from "./_components/VehicleList";
import { emit } from "../../../hooks/emit";
import { useEffect } from "react";
import { useVehicles } from "./_stores/useVehicles";

export const Vehicles = () => {
  const vehicles = useVehicles();
  useEffect(() => {
    emit("getServerVehicles", {}, [
      {
        name: "Lancer",
        spawn: "lancerevolutionx",
        favorite: false,
        image:
          "https://s3-alpha-sig.figma.com/img/f69d/420e/5f9139e473b023dd531812d478620c16?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dgYVOqQ6vk-XqoVzUSI2KZlFAA9U7X4S-jWPEli3ddUE1l48SLJyH1~knqlbvVTzwsprAnm0SaL8ugO5U3f9zexuLGkpZlq9k~sOECkoKBRF1wexF8FdnFZWy2nVscaRJRROMqRPLUP8HJIypWSBoQ1c9bbqyzY9uz4sGeNeVECIjzsTlUI4a2E0uA0xFhw8R4dSwQ5-JnSqvl-tFQ3VPpcBvU2yMh0gmBLpqGe95GtaRr3jdnMTD61r8KK9~qtMMhwS8f0VAXMM1P8-q~aIIyCvuubpE9ItIky4EaXUDYhoqdRfYuCFASykPZQKKomaQFqbAHrANT2MXSj4NAKvSg__",
        attributes: {
          engine: 55,
          body: 100,
          gas: 56,
          trunk: 14,
        },
      },
      {
        name: "zx10r",
        spawn: "zx10r",
        favorite: true,
        image:
          "https://s3-alpha-sig.figma.com/img/f69d/420e/5f9139e473b023dd531812d478620c16?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dgYVOqQ6vk-XqoVzUSI2KZlFAA9U7X4S-jWPEli3ddUE1l48SLJyH1~knqlbvVTzwsprAnm0SaL8ugO5U3f9zexuLGkpZlq9k~sOECkoKBRF1wexF8FdnFZWy2nVscaRJRROMqRPLUP8HJIypWSBoQ1c9bbqyzY9uz4sGeNeVECIjzsTlUI4a2E0uA0xFhw8R4dSwQ5-JnSqvl-tFQ3VPpcBvU2yMh0gmBLpqGe95GtaRr3jdnMTD61r8KK9~qtMMhwS8f0VAXMM1P8-q~aIIyCvuubpE9ItIky4EaXUDYhoqdRfYuCFASykPZQKKomaQFqbAHrANT2MXSj4NAKvSg__",
        attributes: {
          engine: 0,
          body: 0,
          gas: 0,
          trunk: 0,
        },
      },
    ]).then(vehicles.setList);
  }, []);
  return (
    <main className="flex flex-col w-full h-full gap-[16px] animate-fadeIn">
      <Header />
      <VehicleList />
    </main>
  );
};
