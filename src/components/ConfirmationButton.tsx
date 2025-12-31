import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Spinner } from './ui/spinner'

const ConfirmationButton = ({confirmOpen, setConfirmOpen, message, onClick, className, loading, submitBtnName, variant }) => {
  return (
    <>
    <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600"> {message} </p>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant={variant} onClick={() => setConfirmOpen(false)}> Cancel </Button>
            <Button onClick={onClick} className={className} >
              {loading ? <Spinner /> : submitBtnName}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ConfirmationButton