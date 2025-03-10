import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

interface Props {
  paginasOrigin: number[];
  selectedGroups: number[][];
  range: { start: number | null; end: number | null };
  onRangeChange: (type: "start" | "end", value: string | undefined) => void;
  onSaveGroup: () => void;
  handleRangeChange: (type: "start" | "end", value: string | undefined) => void;
}

const PageSelector = ({ paginasOrigin, selectedGroups, range, onRangeChange, onSaveGroup }: Props) => {
  const [existPage, setExistPage] = useState(false);

  // Actualiza `existPage` cada vez que cambian las páginas o los grupos seleccionados
  useEffect(() => {
    const availablePages = paginasOrigin.filter(
      (pageNumber) => !selectedGroups.flat().includes(pageNumber)
    );
    setExistPage(availablePages.length > 0);
  }, [paginasOrigin, selectedGroups]);


  return (
    <div className="flex flex-col gap-4">
      {
        existPage && (
          <>
            <h3 className="text-base font-semibold mb-2">
              Selecione Páginas:
            </h3>
            <div className="flex gap-4">
              <Select
                value={range.start?.toString()}

                onValueChange={(value) => onRangeChange("start", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={range.start?.toString()} />
                </SelectTrigger>
                <SelectContent>
                  {paginasOrigin
                    .filter(
                      (pageNumber) =>
                        !selectedGroups.flat().includes(pageNumber)
                    )
                    .map((pageNumber, index) => (
                      <SelectItem
                        key={pageNumber}
                        value={pageNumber.toString()}
                      >
                        {`Página ${pageNumber} - (${index + 1})`}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Select
                value={range.end?.toString()}
                onValueChange={(value) => onRangeChange("end", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={range.end?.toString()} />
                </SelectTrigger>
                <SelectContent>
                  {paginasOrigin.filter(
                    (pageNumber) =>
                      !selectedGroups.flat().includes(pageNumber)
                  ).map((pageNumber, index) => (
                    <SelectItem
                      key={pageNumber}
                      value={pageNumber.toString()}
                    >
                      {`Página ${pageNumber} - (${index + 1})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )
      }
      <Button onClick={onSaveGroup}
        className="w-full select-none bg-blue-500 border border-transparent transition-all  hover:text-blue-500 hover:bg-white hover:border hover:border-blue-500 active:translate-y-[0.10rem]"
        disabled={!existPage}>
        {existPage ? "Salvar Grupo" : "(No hay páginas disponibles)"}
      </Button>
    </div>
  )

};

export default PageSelector;
