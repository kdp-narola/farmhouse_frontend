import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const Pagination = ({
  data,
  handleFunction,
  handleLimitChange,
  handlePageChange,
  page,
  limit,
  totalPage,
  currentPage,
  displayLimitBtn,
}) => {
  return (
    <>
      <div className="space-y-4">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {handleFunction}
        </div>
        {data?.length > 0 && (
          <div className="flex justify-between">
            <DropdownMenu>
              {displayLimitBtn && (
                <>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="border border-gray-200">
                      Select Limit
                    </Button>
                  </DropdownMenuTrigger>
                </>
              )}
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select Limit</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={String(limit)}
                  onValueChange={(value) => handleLimitChange(Number(value))}
                >
                  <DropdownMenuRadioItem value="1"> 1 </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="20"> 20 </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="30"> 30 </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="50"> 50 </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex justify-center items-center">
              <Button
                variant="ghost"
                className="disabled:text-gray-400 hover:bg-gray-50"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={page === 1}
              >
                <ChevronLeft />
              </Button>
              <span>
                {" "}
                Page {currentPage} of {totalPage}{" "}
              </span>
              <Button
                variant="ghost"
                className="disabled:text-gray-400 hover:bg-gray-50"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={page === totalPage}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Pagination;
