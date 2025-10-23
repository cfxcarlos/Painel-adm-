import { Header } from "./_components/Header";
import { ItemList } from "./_components/ItemList";
import { emit } from "../../../hooks/emit";
import { useEffect } from "react";
import { useItems } from "./_stores/useItems";

export const Items = () => {
  const items = useItems();
  useEffect(() => {
    emit("getServerItems", {}, [
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Energético",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
      {
        name: "Dinheiro Sujo",
        spawn: "energetico",
        image:
          "https://s3-alpha-sig.figma.com/img/c342/ef08/64d12de8518072ca0275f50e1a638710?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htBM7FT6zUPyQfjfCNgLlYsfLz7xhCVeokWtfZ7JOhDspl1RGiDIAWuzjdREtG4fwSX4C9lutHHcQCNnL6uXGhk6P4Fsc8c5N3C-fuEL8Fx7TkdB4Lfnzm1jeNutu01FutNo3uo6pl-dLb4qYRsjS-~Bm0rQBEvj-wEkzZNQd13dZtujE7lex~VMkegyvgqQd33PPOh-6zXL9gPesKoUIDbCyXI6pzRuMWOuXW-LAxIxhk9yswqYC-812E2F-Hm6L-R0t7UDRs-GVT-70SqX1jWCcGA4b8OOKefGEwE5reU3xqt~Nr1hNmh6o2dSn1T5JycJBLhhXgg2EuFodInK8A__",
      },
    ]).then(items.setList);
  }, []);
  return (
    <main className="flex flex-col w-full h-full gap-[16px] animate-fadeIn">
      <Header />
      <ItemList />
    </main>
  );
};
