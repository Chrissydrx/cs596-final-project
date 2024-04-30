import LogoutButton from "@/components/logout-button";
import TypographyH1 from "@/components/typography/typography-h1";
import TypographyH2 from "@/components/typography/typography-h2";
import getSession from "@/lib/actions/get-session";

async function Page() {
  const [address, isRegisteredUniversity] = await getSession();

  if (address == null) {
    return null;
  }

  const universityPages = [
    { name: "Edit the displayed university name", path: "/action/edit-name" },
    {
      name: "Add a qualification to a student",
      path: "/action/add-qualification",
    },
    { name: "Vote on university candidates", path: "/action/vote" },
  ];

  const studentPages = [
    { name: "Edit your displayed name", path: "/action/edit-name" },
    {
      name: "Apply to become a university candidate",
      path: "/action/apply-to-be-registered",
    },
  ];

  return (
    <>
      <LogoutButton className="fixed top-1 right-1" />
      {isRegisteredUniversity ? (
        <div>
          <TypographyH1>Hey, what do you want to do?</TypographyH1>
          <br />
          <ul>
            {universityPages.map((page) => (
              <li key={page.path}>
                <a href={page.path}>
                  <TypographyH2 hover={true}>{page.name}</TypographyH2>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <TypographyH1>Hey, what do you want to do?</TypographyH1>
          <br />
          <ul>
            {studentPages.map((page) => (
              <li key={page.path}>
                <a href={page.path}>
                  <TypographyH2 hover={true}>{page.name}</TypographyH2>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Page;
