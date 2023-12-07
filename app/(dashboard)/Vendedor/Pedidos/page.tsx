'use client'
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Link
} from "@nextui-org/react";
import { PlusIcon } from "../../../components/TableCompuestos/PlusIcon";
import { VerticalDotsIcon } from "../../../components/TableCompuestos/VerticalDotsIcon";
import { ChevronDownIcon } from "../../../components/TableCompuestos/ChevronDownIcon";
import { SearchIcon } from "../../../components/TableCompuestos/SearchIcon";
import { columns } from "./data";
import { capitalize } from "../../../components/TableCompuestos/utils";
import { EyeFilledIcon } from "../../../components/PasswordInput/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../../components/PasswordInput/EyeSlashFilledIcon";
import axios from "axios";
import CargaComponent from '../../../components/Carga/CargaComponent';
import { useSession, signOut } from "next-auth/react";
import './usuarioGlobal.css'
import IUsuario from '@/app/models/IUsuario';
import { IPedidoVendedor } from '@/app/models/IPedidoVendedor';
import Swal from 'sweetalert2';
const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["nombreProducto","cliente","estatus","cantidad" ,"precio","actions"];



export default function page() {
  const { data: session, status } = useSession();
  

  const [pedidos, setPedidos] = useState<IPedidoVendedor[]>([])
  useEffect(() => {
      const fetchData = async () => {
          if (session?.user.token) {
              try {
                  const response = await axios.get(`http://localhost:8080/api/pedidos`, {
                      headers: {
                          'Content-Type': 'application/json',
                          'Access-Control-Allow-Origin': '*',
                          "Authorization": `Bearer ${session.user.token}`
                      },
                  });

                  console.log(response.data);
                  setPedidos(response.data);
              } catch (error) {
                  console.error('Error al obtener los datos:', error);
              }
          }
      };

      fetchData();
  }, [session]);


  const handlerFinalizarPedido = async (idPedido: number) => {
    try {
      // Mostrar alerta de confirmación
      const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres finalizar este pedido?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4D8B55',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, finalizar',
        cancelButtonText: 'Cancelar',
      });
  
      // Si el usuario confirma, realizar la solicitud
      if (confirmacion.isConfirmed) {
        await axios.put(
          `http://localhost:8080/api/pedidos/${idPedido}?usuario=${session?.user.id}`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              Authorization: `Bearer ${session?.user.token}`,
            },
          }
        );
  
        // Alerta de éxito
        Swal.fire({
          icon: 'success',
          title: 'Pedido finalizado con éxito',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error al finalizar pedido:', error);
  
      // Alerta de fallo
      Swal.fire({
        icon: 'error',
        title: 'Error al finalizar pedido',
        text: 'Hubo un problema al intentar finalizar el pedido. Por favor, inténtalo nuevamente.',
      });
    }
  }
      
   

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredPedidos = [...pedidos];

    if (hasSearchFilter) {
      filteredPedidos = filteredPedidos.filter((pedido) =>
        pedido.cliente.nombre.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }


    return filteredPedidos;
  }, [pedidos, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
  
  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: IPedidoVendedor, b: IPedidoVendedor) => {
      const first = a[sortDescriptor.column as keyof IPedidoVendedor];  // Sin conversión a número
      const second = b[sortDescriptor.column as keyof IPedidoVendedor]; // Sin conversión a número
      const cmp = first < second ? -1 : first > second ? 1 : 0;
  
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  

  const renderCell = React.useCallback((pedido: IPedidoVendedor, columnKey: React.Key) => {
    const cellValue = pedido[columnKey as keyof IPedidoVendedor];

    switch (columnKey) {
      case "nombreProducto":
        return (
          <User
            avatarProps={{ radius: "lg", src: `${pedido.detallesPedido[0].producto.imagenes[0].imagenURL}`}}
            description={pedido.tienda.nombre}
            name={`${pedido.detallesPedido[0].producto.nombre} `}
          >
            {pedido.tienda.nombre}
          </User>
        );
        case "cliente":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{`${pedido.cliente.nombre} ${pedido.cliente.apellidoPaterno} ${pedido.cliente.apellidoMaterno}`}</p>
            </div>
          );  
          case "correo":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{pedido.cliente.correoElectronico}</p>
            </div>
          );  
          case "telefono":
            return (
              <div className="flex flex-col">
                <p className="text-bold text-small capitalize">{pedido.cliente.telefono}</p>
              </div>
            );  
        case "cantidad":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{pedido.detallesPedido[0].cantidad}</p>
            </div>
          );  
       
        case "precio":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">${pedido.detallesPedido[0].precio}</p>
          </div>
        );
        
      case "estatus":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{pedido.estatus.estatus}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => handlerFinalizarPedido(pedido.id)}>Finalizar pedido</DropdownItem>
                {/* <DropdownItem>Cancelar pedido</DropdownItem> */}
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return String(cellValue);
    }
  }, [onOpen]);
  

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("")
    setPage(1)
  }, [])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar usuario..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
    
            <Dropdown>
              <DropdownTrigger className="sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button style={{
              backgroundColor: "#4D8B55",
              color: "white",
            }} endContent={<PlusIcon />}>
              Nuevo usuario
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total de usuarios: {pedidos.length} </span>
          <label className="flex items-center text-default-400 text-small">
            Filas de la tabla:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    pedidos.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos seleccionados"
            : `${selectedKeys.size} de ${filteredItems.length} seleccionados`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div className="usuario-global-container px-5">

      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader className="" columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"Pedido no encontrado"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
   



    </div>

  );
}
