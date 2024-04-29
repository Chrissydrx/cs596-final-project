import LogoutButton from "@/components/logout-button";
import getSession from "@/lib/actions/get-session";

async function Page() {
  const [address, isRegisteredUniversity] = await getSession();

  if (address == null) {
    return null;
  }

  const universityPages = [
    { name: "Edit Name", path: "/action/edit-name" },
    { name: "Vote", path: "/action/vote" },
    { name: "Add Qualification", path: "/action/add-qualification" },
  ];

  const studentPages = [
    { name: "Edit Name", path: "/action/edit-name" },
    { name: "Apply to be registered", path: "/action/apply-to-be-registered" },
  ];

  return (
    <>
      <LogoutButton className="fixed top-1 right-1" />
      {isRegisteredUniversity ? (
        <div>
          <h1>University</h1>
          <ul>
            {universityPages.map((page) => (
              <li key={page.path}>
                <a href={page.path}>{page.name}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h1>Student</h1>
          <ul>
            {studentPages.map((page) => (
              <li key={page.path}>
                <a href={page.path}>{page.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Page;
