import swal from "sweetalert2";

export const userSwal = (timer, icon, text) => {
    swal.fire({
        icon,
        text,
        position: "bottom-left",
        toast: true,
        showConfirmButton: false,
        timer,
        timerProgressBar: true,
    })
}