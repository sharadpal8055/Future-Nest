import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const courseId = params.get("courseId");
    const sessionId = params.get("session_id"); 

   
    if (!courseId ) {
      toast.error("Payment verification failed");
      navigate("/courses");
      return;
    }

    api
      .post("/enrollments/paid", {
        courseId,
        sessionId
      })
      .then(() => {
        toast.success("Payment successful! Enrolled 🎉");
        navigate("/my-courses");
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message ||
          "Enrollment failed after payment"
        );
        navigate("/courses");
      });
  }, [navigate, params]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Finalizing enrollment…</p>
    </div>
  );
}
