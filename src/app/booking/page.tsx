import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import BookingForm from "@/components/BookingForm";

export default async function Booking() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const profile = await getUserProfile(session.user.token);
  var createdAt = new Date(profile.data.createdAt);

  return (
    <main className="p-10 bg-slate-50 min-h-screen">
      {profile ? (
        <div className="bg-white rounded-2xl shadow-md p-8 mx-3 border border-slate-200">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-blue-500">
            User Profile Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-cyan-600 uppercase tracking-wider">
                Name
              </span>
              <p className="text-lg text-slate-700">{profile.data.name}</p>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-cyan-600 uppercase tracking-wider">
                Email
              </span>
              <p className="text-lg text-slate-700">{profile.data.email}</p>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-cyan-600 uppercase tracking-wider">
                Tel.
              </span>
              <p className="text-lg text-slate-700">{profile.data.tel}</p>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-cyan-600 uppercase tracking-wider">
                Member Since
              </span>
              <p className="text-lg text-slate-700">{createdAt.toString()}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg mb-10">
          Please log in to see your profile and make a booking.
        </div>
      )}

      <BookingForm />
    </main>
  );
}
