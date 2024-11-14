import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import ProjectDetailsArea from "@/components/ProjectsArea/ProjectDetails/ProjectDetailsArea";
import ProjectDetailsContent from "@/components/ProjectsArea/ProjectDetails/ProjectDetailsContent";
import SimilarProjects from "@/components/ProjectsArea/SimilarProjects";
import PageTitle from "@/components/Reuseable/PageTitle";
import React, {useEffect, useState} from "react";

import { useRouter } from "next/router";

import axiosInstance from "src/config/axios/axios";

const SingleProject = () => {
  const router = useRouter();
  const { id } = router.query;

  const [project, setProject] = useState({})

  useEffect(() => {
    axiosInstance
      .get(`project/project?id=${id}`, {
        headers: {
          "Content-Type": "multipart/form-data", // Este encabezado se ajusta automáticamente
        },
      })
      .then((response) => response.data.data)
      .then((data) => {
        setProject(data);
        console.log(data);

        // setTotalPages(data.totalPages);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <Layout>
      <Header />
      <PageTitle title={project?.title} page="Explore" />
      <ProjectDetailsArea project={project || {}} />
      {
        project &&  <ProjectDetailsContent project={project || {}} />
      }
      {/* <SimilarProjects /> */}
    </Layout>
  );
};

export default SingleProject;
