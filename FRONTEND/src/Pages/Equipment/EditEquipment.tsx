import Form from "@/Components/EquipmentManagement/Form";
import BoxContainer from "@/Components/Shared/BoxContainer";
import { toastMessages } from "@/helpers/toastMessages";
import { routes } from "@/Router/routes";
import { createEquipment } from "@/Services/EquipmentService";
import type { EquipmentType } from "@/Types/EquipmentTypes";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

export default function EditEquipment() {
    const params = useParams();
    const navigate = useNavigate();
    const [tool] = useState<EquipmentType | undefined>(undefined);

    useEffect(() => {
        if (!params.id) {
            navigate(routes.EQUIPMENT.EQUIPMENT_MANAGEMENT)
        }
    }, [params.id, navigate])

    useEffect(() => {
        if (!params.id) {
            return
        }
    }, [params.id])

    const handlerSubmit = async (data: EquipmentType) => {
        await createEquipment(data);
        toast.success(`¡El equipo ${toastMessages.updatedSuccess}`)
        navigate(`/${routes.EQUIPMENT.EQUIPMENT_MANAGEMENT}`, { replace: true })
    }

    return (
        <BoxContainer height='h-[95%] p-4'>
            {tool && (
                <Form handlerSubmit={handlerSubmit} e={tool} />
            )}
        </BoxContainer>
    )
}
