export default function Modal({
    title="",
    footer,
    children
}) {
    return (
        <div className="modal fade" tabIndex="-1" aria-hidden={false} id="customModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{title}</h5>
                  <button type="button" className="btn-close"aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  {children}
                </div>
                {footer?(
                    <div className="modal-footer"><footer/></div>
                ):
                (
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                )
                }
              </div>
            </div>
        </div>
    )
}