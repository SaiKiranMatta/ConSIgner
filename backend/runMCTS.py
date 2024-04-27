import copy
from containerMCTS import ContainerMCTS
from Container import Container
import helper


class runMCTS():
    def __init__(self, boxesJSON, boxes_cbmJSON, noofboxes, containerDimensions):
        CONTAINER_DIMENSIONS = containerDimensions
        container_cbm = CONTAINER_DIMENSIONS["length"] * \
            CONTAINER_DIMENSIONS["width"] * CONTAINER_DIMENSIONS["height"]
        container_cbm /= 1000000
        NUMBER_OF_BOXES = noofboxes
        MIN_EDGE_SIZE = 20
        MAX_EDGE_SIZE = 60
        SPACE_SCALING_FACTOR = 10
        boxes, boxes_cbm = helper.simulateBoxData(
            NUMBER_OF_BOXES, MIN_EDGE_SIZE, MAX_EDGE_SIZE, 1, True)
        # boxes, boxes_cbm = helper.loadBoxData()
        # boxes, boxes_cbm = helper.loadBoxData("Exp-20240426-183128")
        boxes, boxes_cbm = boxesJSON, boxes_cbmJSON
        print(boxes)
        container = Container(length=CONTAINER_DIMENSIONS["length"], width=CONTAINER_DIMENSIONS["width"],
                              height=CONTAINER_DIMENSIONS["height"], boxes=boxes, spaceOptimizationFactor=SPACE_SCALING_FACTOR, useDeepSearch=False)
        noMCTS_seq_container = copy.deepcopy(container)
        noMCTS_rnd_container = copy.deepcopy(container)
        containerMCTS = ContainerMCTS(
            container=container, maxIterations=2500, explorationConstant=0.25)
        bestNode = containerMCTS.fill()
        bestContainer = bestNode.projectedContainer
        nodeCBM = bestNode.totalCBM
        while bestNode is not None:
            bestContainer = bestNode.projectedContainer
            bestNode = containerMCTS.getBestLeaf(
                bestNode, explorationConstant=0)
        if bestContainer is not None:
            data = bestContainer.getResultsJSON()
            helper.writeContainerDataToFile(data)
            print("Boxes at hand %s @ %sCBM" % (NUMBER_OF_BOXES, boxes_cbm))
            print("Container Dimensions: L:%s H:%s W:%s @ %sCBM" %
                  (data["dimensions"]["length"], data["dimensions"]["height"], data["dimensions"]["width"], data["containerCBM"]))
            print("Scaled container dimensions: %s" %
                  (data["scaledDimensions"]))
            print("----------------------------------")
            print("Node CBM is %s" % nodeCBM)
            print("Projected CBM: %sCBM w/ %s boxes" %
                  (data["cbm"], len(data["boxes"])))
            print("----------------------------------")
        noMCTS_seq_container.placeBoxesSequentially()
        seq_cnt = noMCTS_seq_container.getResultsJSON()
        print("NON-MCTS Seq Total calc'ed: %sCBM" % (seq_cnt["cbm"]))
        noMCTS_rnd_container.placeBoxesRandomly()
        rnd_cnt = noMCTS_seq_container.getResultsJSON()
        print("NON-MCTS Rand Total calc'ed: %sCBM" % (rnd_cnt["cbm"]))
        helper.renderContainerData(data)
        # helper.renderContainerData(seq_cnt)
